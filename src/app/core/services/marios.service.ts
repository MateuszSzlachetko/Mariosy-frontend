import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marios, MariosPayload } from '../interfaces/marios.interface';
import { ChipsReactions } from '../models/chips-reaction.model';

@Injectable({
  providedIn: 'root',
})
export class MariosService {
  private reactions: ChipsReactions = new ChipsReactions();
  constructor(private http: HttpClient) {}

  postMarios(marios: MariosPayload) {
    console.log(marios);
    const url = `api/v1/marios/add`;
    return this.http.post<Marios>(url, marios).subscribe((data) => {
      console.log(data);
    });
  }

  getReactionIconSrc(name: string) {
    return this.reactions.getSrc(name);
  }
}
