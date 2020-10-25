import { BoopersSchmoopers } from "./boop";

export class Hugger extends BoopersSchmoopers {
   protected readonly boopstr: string = "HUG";
   public constructor() {
      super("hug");
   }
}
