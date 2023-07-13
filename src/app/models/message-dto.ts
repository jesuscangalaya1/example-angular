export class MessageDto {

  message: string;
  picture: string;

  constructor(message: string, picture: string) {
    this.message = message;
    this.picture = picture;
  }
}
