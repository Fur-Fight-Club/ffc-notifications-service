import {
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

export enum MatchMessageError {
  NO_MATCH_FOUND = "No 'Match' record(s) (needed to inline the relation on 'MatchMessage' record(s)) was found for a nested connect on one-to-many relation 'MatchToMatchMessage'.",
  NO_USER_FOUND = "No 'User' record(s) (needed to inline the relation on 'MatchMessage' record(s)) was found for a nested connect on one-to-many relation 'MatchMessageToUser'.",
}

export const handleMatchMessageError = (error: { meta: { cause: string } }) => {
  switch (error.meta.cause) {
    case MatchMessageError.NO_MATCH_FOUND:
      throw new NotFoundException("No match found for this id");
    case MatchMessageError.NO_USER_FOUND:
      throw new NotFoundException("No user found for this id");

    default:
      throw new InternalServerErrorException(error.meta.cause);
  }
};
