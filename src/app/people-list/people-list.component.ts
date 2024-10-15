import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { People, PeopleService } from '../people.service';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.css'
})
export class PeopleListComponent implements OnInit{

  peoples: People[] = [];

  constructor(private peopleService: PeopleService) {}

  ngOnInit(): void {
    this.getPeoples();
  }

  getPeoples(): void {
    this.peopleService.getPeoples().subscribe(
      (data: People[]) => {
        this.peoples = data;
      },
      (error) => {
        console.error('Erro ao carregar pessoas:', error);
      }
    );
  }

  onDeletePeople(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
      this.peopleService.deletePeople(id).subscribe(
        () => {
          this.getPeoples();
          console.log('Pessoa excluído com sucesso');
        },
        (error) => {
          console.error('Erro ao excluir pessoa:', error);
        }
      );
    }
  }

}
