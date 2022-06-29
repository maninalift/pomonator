import type { Load } from '@sveltejs/kit'
export const requireUser: Load = ({ session }) => {
  if (!session.user?.username) {
    return {
      status: 302,
      redirect: '/auth/login',
    }
  }
  return {
    status: 200,
    props: {
      user: session.user.name,
    },
  }
}

export const requireAdmin: Load = ({ session }) => {
  if (!session.user?.isAdmin) {
    return {
      status: 302,
      redirect: '/',
    }
  }
  return {
    status: 200,
    props: {
      user: session.user.name,
    },
  }
}

export const requireCoach: Load = ({ session }) => {
  if (!session.user?.isCoach) {
    return {
      status: 302,
      redirect: '/',
    }
  }
  return {
    status: 200,
    props: {
      user: session.user.name,
    },
  }
}

export const requireStudent: Load = ({ session }) => {
  if (!session.user?.isStudent) {
    return {
      status: 302,
      redirect: '/',
    }
  }
  return {
    status: 200,
    props: {
      user: session.user.name,
    },
  }
}