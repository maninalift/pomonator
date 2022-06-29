import type { GetSession, Handle } from '@sveltejs/kit'
import * as cookie from 'cookie'

import { db } from '$lib/database'

export const handle: Handle = async ({
  event,
  resolve,
}) => {

  const cookieHeader = event.request.headers.get('cookie')
  const cookies = cookie.parse(cookieHeader ?? '')

  if (!cookies.authentication) {
    console.log("no authentication cookie")
    return await resolve(event)
  }

  const authentication = await db.authentication.findUnique({
    where: { id: cookies.authentication},
    select: {
      expires: true,
      user: {select : {
        name: true, 
        username: true,
        admin: true,
        coach: {select: {id: true}}, 
        student: {select: {id: true}}}
      }
    } 
  })

  // // alternative, using sessions : Map<string, Session>
  // if (!cookies.session_id) return ....
  // session = sessions.get(cookies.session_id)
  // if (session.expires < new Date()) {sessions.delete(cookies.session_id)}
  // if (!session.authentication) return ...
  // user = db.user.findUnique({session.authentication.user_id})...
  //
  // // ...but perhaps this wouldn't work for a sveltekit adaptor 
  // //    other than node, that is "more serverless" / doesn't have
  // //      a persistent execution context between requests

  if (!authentication) {
    const response = await resolve(event);

    console.log("clearing invalid authentication ", cookies.authentication)
    
    response.headers.set(
      'set-cookie',
      cookie.serialize('authentication', '', {
        expires: new Date(0)
      })
    )

    return response
  }

  if (authentication.expires < new Date()){

    // not awaiting, fire and forget
    console.log("deleting old authentication : ", cookies.authentication)

    await db.authentication.delete({where: {id: cookies.authentication}})

    const response = await resolve(event);
    
    response.headers.set(
      'set-cookie',
      cookie.serialize('authentication', '', {
        expires: new Date(0)
      })
    )

    return response
  }

  console.log("good authentication ", cookies.authentication)

  event.locals.user = {
    name: authentication.user.name,
    username: authentication.user.username,
    isCoach: !!(authentication.user.coach),
    isAdmin: authentication.user.admin,
    isStudent: !!(authentication.user.student)
  }

  return await resolve(event)
}

export const getSession: GetSession = ({ locals }) => {
  if (!locals.user) return {}
  return {
    user: Object.assign({}, locals.user)
  }
}