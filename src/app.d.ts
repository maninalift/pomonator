/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

type UserInfo = {
	username: string,
	name: string,
	isAdmin: boolean,
	isCoach: boolean,
	isStudent: boolean
}

declare namespace App {

	interface Locals {
		user?: UserInfo
	  }
	  // interface Platform {}
	  interface Session {
		user?: UserInfo
	  }

	  // interface Stuff {}
}
