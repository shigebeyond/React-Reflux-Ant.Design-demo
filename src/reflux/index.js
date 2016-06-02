import Reflux from "reflux";
import RefluxPromise from "reflux-promise";
import RefluxPartial from "reflux-partial";

// Uses the user agent's Promise implementation
Reflux.use(RefluxPromise(window.Promise));

// Extend connect
Reflux.connectPart = RefluxPartial.connect;

// Extend store
Reflux.StoreMethods = Object.assign(Reflux.StoreMethods, RefluxPartial.StoreMethods);


export default Reflux;
