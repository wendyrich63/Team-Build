import { supabase } from "../../supabase.js";

// This function the users email, type & password as an input
//  It inserts a new instance of user.

export default async function insertUser(userToAdd) {
  console.log(userToAdd);
  try {
    const { error } = await supabase.from("main_users").insert(userToAdd);

    if (error) {
      console.log(error);
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(`Failed to insert user`);
    return false;
  }
}
