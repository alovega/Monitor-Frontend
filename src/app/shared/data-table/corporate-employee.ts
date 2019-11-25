export class CorporateEmployee {
  name: string;
  status: string;
  description: string;
  url: string;
  id: string;
  responseTime: number;
  dateCreated: string;
  // tslint:disable-next-line: variable-name
  date_modified: string;
  type: string;
  // tslint:disable-next-line: variable-name
  system__name: string;
  constructor(name: string, status: string, description: string, responseTime: number, dateCreated: string,
              type: string, id: string, url: string) {
    this.name = name;
    this.status = status;
    this.description = description;
    this.responseTime = responseTime;
    this.dateCreated = dateCreated;
    this.type = type;
    this.id = id;
    this.url = url
  }
}