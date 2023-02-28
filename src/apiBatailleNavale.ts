import { Application } from "express";
import { createPartie, PARTIE } from "./data";

export function CreateServerBataille(app:Application):void{
    let idPartie = 0;
    const parties = new Map<string,PARTIE>();

    app.get('/batailles',(req,res)=>{
        res.json([...parties.keys()].map(id => parties.get(id)));

    });

    app.post('/bataille/create',(req,res)=>{
        console.log('Création de la partie !');
        if (req.body.joueur1 && req.body.joueur2){
            const {joueur1,joueur2} = req.body;
            const P:PARTIE = createPartie(joueur1, joueur2);
            parties.set(P.id, P);
            res.json(P);
        } else {
            res.status(400).send("Il manque le nom des joueurs !");
        }
    });

}