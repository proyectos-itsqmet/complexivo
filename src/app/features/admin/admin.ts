import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Peliculas } from '../../models/pelicula';
import { PeliculasService } from '../../services/peliculas-service';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  private service = inject(PeliculasService);

  list = signal<Peliculas[]>([]);
  newItem: Peliculas = this.emptyItem();
  editing = false;

  ngOnInit() {
    this.load();
  }

  private emptyItem(): Peliculas {
    return { id: 1, titulo: '', genero: '', duracion: 1, anio: 1 };
  }

  load() {
    this.service.getAll().subscribe({
      next: (data) => this.list.set(data),
      error: () => alert('No se pudo cargar los registros. ¿Está corriendo json-server?'),
    });
  }

  selectForEdit(item: Peliculas) {
    this.editing = true;
    this.newItem = { ...item };
  }

  save() {
    const request =
      this.editing && this.newItem.id !== undefined
        ? this.service.put(this.newItem.id, this.newItem)
        : this.service.post(this.newItem);
    request.subscribe({
      next: () => {
        this.load();
        this.reset();
      },
      error: () => alert('No se pudo guardar el registro'),
    });
  }

  delete(id?: number) {
    if (id === undefined || !confirm('¿Desea eliminar el registro?')) {
      return;
    }
    this.service.delete(id).subscribe({
      next: () => this.load(),
      error: () => alert('No se pudo eliminar el registro'),
    });
  }

  reset() {
    this.editing = false;
    this.newItem = this.emptyItem();
  }
}
