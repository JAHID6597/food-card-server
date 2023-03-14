import { Schema as MongooseSchema } from 'mongoose';
import { DeleteResponseDTO } from '../dto/delete-response.dto';
import { UpdateResponseDTO } from '../dto/update-response.dto';

export class ResponseHelper {
  public static updateResponse(
    id: string | MongooseSchema.Types.ObjectId,
    isUpdated: boolean,
  ) {
    const updateResponse = new UpdateResponseDTO(String(id));
    updateResponse.is_updated = isUpdated;
    updateResponse.message = this.getResponseMessage(
      isUpdated,
      ResponseType.UPDATE,
    );
    return updateResponse;
  }

  public static deleteResponse(
    id: string | MongooseSchema.Types.ObjectId,
    isDeleted: boolean,
  ) {
    const deleteResponse = new DeleteResponseDTO(String(id));
    deleteResponse.is_deleted = isDeleted;
    deleteResponse.message = this.getResponseMessage(
      isDeleted,
      ResponseType.DELETE,
    );
    return deleteResponse;
  }

  public static getResponseMessage(isSuccess: boolean, type: ResponseType) {
    return isSuccess
      ? `Successfully ${type === ResponseType.UPDATE ? 'updated' : 'deleted'}.`
      : `${
          type === ResponseType.UPDATE
            ? ResponseType.UPDATE
            : ResponseType.DELETE
        } failed.`;
  }
}

enum ResponseType {
  UPDATE = 'Update',
  DELETE = 'Delete',
}
