import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marios, MariosPayload } from '../interfaces/marios.interface';
import { ChipsReactions } from '../models/chips-reaction.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class MariosService {
  private url: string = 'api/v1/marios';
  private reactions: ChipsReactions = new ChipsReactions();
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  postMarios(marios: MariosPayload) {
    const url = this.url + '/add';
    return this.http.post<Marios>(url, marios).subscribe((data) => {
      this.sessionService.updateGivenMarios(data);
    });
  }

  getReactionIconSrc(name: string) {
    return this.reactions.getIconSrc(name);
  }
}
