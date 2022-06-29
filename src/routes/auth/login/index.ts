import type { RequestHandler } from '@sveltejs/kit'
import * as bcrypt from 'bcrypt'
import * as cookie from 'cookie'

import { db } from '$lib/database'
import { session } from '$app/stores'

export const post: RequestHandler = async ({ request }) => {
  const form = await request.formData()
  const username = form.get('username')
  const password = form.get('password')

  if (
    typeof username !== 'string' ||
    typeof password !== 'string'
  ) {
    return {
      status: 400,
      body: {
        error: 'Enter a valid username and password.',
      },
    }
  }

  if (!username || !password) {
    return {
      status: 400,
      body: {
        error: 'Username and password is required',
      },
    }
  }

  const user = await db.user.findUnique({
    where: { username },
  })
  const passwordMatch =
    user &&
    (await bcrypt.compare(password, user.passwordHash))

  if (!user || !passwordMatch) {
    return {
      status: 400,
      body: {
        error: 'You entered the wrong credentials.',
      },
    }
  }

  const authentication = await db.authentication.create({
    data: {userId: user.id},
    select: {
      id: true,
      user: {
        select: {
          name: true,
          username: true,
          coach: {select: {id: true}},
          student: {select: {id: true}},
          admin: true
        }
      }
    }
  })

  return {
    status: 200,
    body: {
      user: {
        username: authentication.user.username,
        name: authentication.user.name,
        isAdmin: authentication.user.admin,
        isCoach: (!!authentication.user.coach),
        isStudent: (!!authentication.user.student)
      },
      success: 'Success.',
    },
    headers: {
      'Set-Cookie': cookie.serialize('authentication', authentication.id, {
        // send cookie for every page
        path: '/',
        // server side only cookie so you can't use `document.cookie`
        httpOnly: true,
        // only requests from same site can send cookies
        // and serves to protect from CSRF
        // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
        sameSite: 'strict',
        // only sent over HTTPS
        secure: process.env.NODE_ENV === 'production',
        // set cookie to expire after a month
        maxAge: 60 * 60 * 24 * 30,
      }),
    },
  }
}