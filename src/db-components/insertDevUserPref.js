import { supabase } from "../../supabase.js";

// This function takes the dev user preferences as input 
//  It inserts a new instance of dev user preference.

export default async function insertDevUserPref( devUserPrefToAdd) {

  try {
    const { error } = await supabase.from("dev_user_pref").insert(devUserPrefToAdd);

    if (error) {
      console.log(error);
      return false;
  } else {
    return true;
  }
} catch (error) {
  console.log(`Failed to insert developers user pref for user ${id}`);
  return false;
}
}
  