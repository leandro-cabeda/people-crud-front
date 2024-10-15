import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { People, PeopleService } from '../people.service';

@Component({
  selector: 'app-people-form',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './people-form.component.html',
  styleUrl: './people-form.component.css'
})
export class PeopleFormComponent implements OnInit{

  people: People = {
    nome: '',
    email: '',
    telefone: '',
    tipoPessoa: { tipo: 'juridica' }
  };

  isEditMode = false;
  id: number | null = null;

  constructor(
    private peopleService: PeopleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;

    // Se o ID for válido, entra no modo de edição
    if (this.id) {
      this.isEditMode = true;
      this.peopleService.getPeople(this.id).subscribe(
        (data: People) => {
          this.people = data;
        },
        (error) => {
          console.error('Erro ao buscar pessoa:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.peopleService.updatePeople(this.id!, this.people).subscribe(
        () => {
          console.log('Pessoa atualizado com sucesso');
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Erro ao atualizar pessoa:', error);
        }
      );
    } else {
      this.peopleService.createPeople(this.people).subscribe(
        (data: People) => {
          console.log('Pessoa criado com sucesso:', data);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Erro ao criar pessoa:', error);
        }
      );
    }
  }

}
