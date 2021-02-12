/**
 * This function takes a variable name and checks process.env for its existence.
 *
 * @param varname variable name to check existence of
 * @returns the environment variable if it exists, or false
 */
function checkenv(varname: string): boolean {
   return process.env[varname] !== undefined;
}

// /**
//  * This function takes a variable name and exits the process with a non-zero exit code
//  * if it doesn't exist.
//  *
//  * @param varname variable name to assert existence of
//  */
// export function assertenv(varname: string): never | void {
//    if (!checkenv(varname)) {
//       console.error(`no environment variable called ${varname}`);
//       process.exit(1);
//    }
// }

/**
 * checks if process.env.NODE_ENV is "dev" or "development". If it doesn't exist,
 * it assumes development.
 * @returns  whether or not env is considered development
 */
export function envisdev(): boolean {
   // if NODE_ENV doesnt exist, assume development
   // if it does, check for mode "dev" or "development"
   // then configure using dotenv
   return !checkenv("NODE_ENV") || process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "development";
}

// /**
//  * checks if process.env.NODE_ENV is NOT "dev" or "development". If it doesn't exist,
//  * it assumes development. NODE_ENV could be something else, if its not "dev" or "development"
//  * it's considered production.
//  *
//  * see {@link envisdev}
//  *
//  * @returns whether or not env is considered production
//  */
// export function envisprod(): boolean {
//    return !envisdev();
// }

export function chopprefix(prefix: string, messagecontent: string): string | false {
   return messagecontent.toLowerCase().startsWith(prefix.toLowerCase())
      ? messagecontent.substring(prefix.length)
      : false;
}

export function getnextarg(messagecontent: string): [string, string] {
   const space = messagecontent.indexOf(" ");
   return space === -1 ? [messagecontent, ""] : [
      messagecontent.substring(0, space).trim(),
      messagecontent.substring(space + 1).trim()
   ];
}

export const wait = (ms: number) => new Promise<void>(res => setTimeout(res, ms));
