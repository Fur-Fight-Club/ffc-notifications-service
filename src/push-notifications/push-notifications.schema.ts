import { ApiProperty } from "@nestjs/swagger";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

/**
 * UPSERT NOTIFICATION TOKEN
 */

export const upsertNotificationToken = z.object({
  token: z.string(),
  platform: z.enum(["IOS", "ANDROID", "WEB"]),
  userId: z.number().int(),
});

export class UpsertNotificationTokenDto extends createZodDto(
  upsertNotificationToken
) {
  @ApiProperty({
    type: "string",
  })
  token: string;

  @ApiProperty({
    type: "string",
    enum: ["IOS", "ANDROID", "WEB"],
  })
  platform: "IOS" | "ANDROID" | "WEB";

  @ApiProperty({
    type: "number",
    default: 1,
  })
  userId: number;
}

export type UpsertNotificationTokenType = z.infer<
  typeof upsertNotificationToken
>;

/**
 * DELETE NOTIFICATION TOKEN
 */

export const deleteNotificationToken = z.object({
  token: z.string(),
});

export class DeleteNotificationTokenDto extends createZodDto(
  deleteNotificationToken
) {
  @ApiProperty({
    type: "string",
  })
  token: string;
}

export type DeleteNotificationTokenType = z.infer<
  typeof deleteNotificationToken
>;

/**
 * UPDATE ACTIVE STATUS
 */

export const updateActiveStatus = z.object({
  token: z.string(),
  active: z.boolean(),
});

export class UpdateActiveStatusDto extends createZodDto(updateActiveStatus) {
  @ApiProperty({
    type: "string",
  })
  token: string;

  @ApiProperty({
    type: "boolean",
  })
  active: boolean;
}

export type UpdateActiveStatusType = z.infer<typeof updateActiveStatus>;
