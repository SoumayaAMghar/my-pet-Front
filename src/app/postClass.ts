import { Post } from "./post";
export class postClass implements Post{
    id!: number;
    titre!: string;
    description!: string;
    ville!: string;
    nbr_jours!: number;
    prix!: number;
    commentaire!: string;
    imageUrl!: string;

}