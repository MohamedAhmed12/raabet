"use server";

import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";
import { generateVCard } from "../helpers/generateVCard";

export async function generateVCardAction(fullname: string) {
  try {
    // Fetch links associated with the user by `username`
    const user = await prisma.user.findFirst({
      where: {
        fullname, // Filter by the `userName` foreign key
      },
      include: {
        links: true, // Optionally include user details in the response
      },
    });

    // If user is not found, throw an error
    if (!user) {
      const err = `Could not find user with name: ${fullname}`;
      logError(err, {
        action: "generateVCardAction",
        fullname,
        errorType: "ValidationError"
      });
      throw new Error(err);
    }

    // Generate vCard content from user data
    const vCard = generateVCard(user);

    // If vCard content could not be generated, throw an error
    if (!vCard) {
      const err = `Could not generate vCard for user: ${fullname}`;
      logError(err, {
        action: "generateVCardAction",
        fullname,
        errorType: "ValidationError"
      });
      throw new Error(err);
    }

    // Return the vCard file as a downloadable response
    return new Blob([vCard], { type: "text/vcard" });
  } catch (error) {
    logError(error, {
      action: "generateVCardAction",
      fullname,
      errorType: error instanceof Error ? error.constructor.name : "UnknownError"
    });
    
    // Return null to handle the error gracefully in the UI
    return null;
  }
}
