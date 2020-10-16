// random stuff for stuff idk

import { transports } from "winston";
import { Logger } from "winston";
import { format } from "winston";
import { createLogger } from "winston";
import { devloglevel, prodloglevel, labelshift, levelshift } from "./consts";

export function normalise(str: string, shift: number): string {
   for (let i: number = str.length; i <= shift; i++) str = str + " ";
   return str;
}

export function getlogger(name: string): Logger {
   return createLogger({
      level: envisprod() ? prodloglevel : devloglevel,
      transports: [new transports.Console],
      format: format.combine(
         format.timestamp(),
         format.label({ label: `[${name}]`, message: false }),
         format.printf(info => {
            return `${info.timestamp} ${normalise(info.label, labelshift)} ${normalise(`[${info.level}]`, levelshift)} ${info.message}`;
         })
      ),
      levels: {
         emerg: 0,
         alert: 1,
         crit: 2,
         error: 3,
         warning: 4,
         notice: 5,
         info: 6,
         debug: 7
      }
   });
}



// const logger: Logger = getlogger("_rando");

export function envisprod(): boolean {
   return process.env.NODE_ENV === "prod" || process.env.NODE_ENV === "production";
}

export function envisdev(): boolean {
   return !envisprod();
}

// i hope i got this right lol
// i must find an official one from like node or something, this is too fragile
export type ProcessEvents = "SIGABRT"
| "SIGALRM"
| "SIGBREAK"
| "SIGBUS"
| "SIGCHLD"
| "SIGCONT"
| "SIGFPE"
| "SIGHUP"
| "SIGILL"
| "SIGINFO"
| "SIGINT"
| "SIGIO"
| "SIGIOT"
| "SIGKILL"
| "SIGLOST"
| "SIGPIPE"
| "SIGPOLL"
| "SIGPROF"
| "SIGPWR"
| "SIGQUIT"
| "SIGSEGV"
| "SIGSTKFLT"
| "SIGSTOP"
| "SIGSYS"
| "SIGTERM"
| "SIGTRAP"
| "SIGTSTP"
| "SIGTTIN"
| "SIGTTOU"
| "SIGUNUSED"
| "SIGURG"
| "SIGUSR1"
| "SIGUSR2"
| "SIGVTALRM"
| "SIGWINCH"
| "SIGXCPU"
| "SIGXFSZ"
| "beforeExit"
| "disconnect"
| "exit"
| "message"
| "multipleResolves"
| "newListener"
| "rejectionHandled"
| "removeListener"
| "uncaughtException"
| "uncaughtExceptionMonitor"
| "unhandledRejection"
| "warning";

export function chopprefix(prefix: string, messagecontent: string): string | false {
   if (messagecontent.startsWith(prefix)) return messagecontent.substring(prefix.length);
   return false;
}

export function getnextarg(messagecontent: string): [string, string] {
   const spacelocation: number = messagecontent.indexOf(" ");
   if (spacelocation === -1) return [messagecontent, ""];
   return [
      messagecontent.substring(0, spacelocation),
      messagecontent.substring(spacelocation + 1)
   ];
}
