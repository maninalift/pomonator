import type { RequestHandler } from '@sveltejs/kit'
import * as bcrypt from 'bcrypt'

import { db } from '$lib/database'

export const post: RequestHandler = async ({ request }) => {
  const form = await request.formData()
  const username = form.get('username')
  const password = form.get('password')
  const name     = form.get('name')

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof name     !== 'string' 
  ) {
    return {
      status: 400,
      body: {
        error: 'Something went horribly wrong.',
      },
    }
  }

  if (!username || !password) {
    return {
      status: 400,
      body: {
        error: 'Username and password is required.',
      },
    }
  }

  if (!name) {
    return {
      status: 400,
      body: {
        error: 'Name is required.',
      },
    }
  }

  try {
    await db.user.create({
      data: {
        name,
        username,
        passwordHash: await bcrypt.hash(password, 10),
      },
    })

    return {
      status: 200,
      body: { success: 'Success.' },
    }
  } catch (error) {
    return {
      status: 400,
      body: {
        error: 'User already exists.',
      },
    }
  }
}
