import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase-service';
import { Maraton } from '../models/maraton';
import { defer, from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaratonService {
  private supabaseService = inject(SupabaseService);
  private TABLE = 'maraton';

  getAll(): Observable<Maraton[]> {
    return defer(() => from(this.supabaseService.client.from(this.TABLE).select('*'))).pipe(
      map(({ data, error }) => {
        if (error) {
          throw new Error(error.message);
        }
        return data as Maraton[];
      }),
    );
  }

  getById(id: number): Observable<Maraton> {
    return defer(() =>
      from(this.supabaseService.client.from(this.TABLE).select('*').eq('id', id).single()),
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          throw new Error(error.message);
        }
        return data as Maraton;
      }),
    );
  }

  post(item: Maraton): Observable<Maraton> {
    return defer(() =>
      from(this.supabaseService.client.from(this.TABLE).insert(item).select().single()),
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          throw new Error(error.message);
        }
        return data as Maraton;
      }),
    );
  }

  put(id: number, item: Maraton): Observable<Maraton> {
    return defer(() =>
      from(
        this.supabaseService.client.from(this.TABLE).update(item).eq('id', id).select().single(),
      ),
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          throw new Error(error.message);
        }
        return data as Maraton;
      }),
    );
  }

  delete(id: number): Observable<unknown> {
    return defer(() =>
      from(this.supabaseService.client.from(this.TABLE).delete().eq('id', id)),
    ).pipe(
      map(({ error }) => {
        if (error) {
          throw new Error(error.message);
        }
        return null;
      }),
    );
  }
}
