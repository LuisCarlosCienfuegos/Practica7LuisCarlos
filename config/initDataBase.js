
import {appFirebase} from "./initAppFire";
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";


const database = getDatabase(appFirebase);

export{ database, ref, set, get, child, onValue };