import 'package:flutter/material.dart';
import 'package:accordion/accordion.dart';



class FAQPage extends StatefulWidget {
  const FAQPage({Key? key}) : super(key: key);

  @override
  State<FAQPage> createState() => _FAQPageState();
}

class _FAQPageState extends State<FAQPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('F.A.Q'),
      ),

      body: Accordion(
        maxOpenSections: 1,
        children: [
          AccordionSection(
            headerText: "Est-ce que Reunionou est gratuit ?",
            content: const Text("Reunionou est une application 100% gratuite. La seule chose que vous avez à faire pour pouvoir l'utiliser est de vous créer un compte.", style: TextStyle(fontSize: 20),),
          ),
          AccordionSection(
            headerText: "Dois-je obligatoirement créer un compte ?",
            content: const Text("Oui, c'est la seule condition pour pouvoir utiliser notre application. Cela nous permet de savoir quels événements vous avez créé, ainsi que ceux auxquels vous êtes invité.", style: TextStyle(fontSize: 20),),
          ),
          AccordionSection(
            headerText: "Comment je peux créer un événément ?",
            content: const Text("Une fois connecté sur votre compte, il vous suffit de cliquer sur le bouton 'Créer un nouvel événement'. Il faut faudra ensuite remplir un formulaire afin de renseigner quelques informations sur l'événement que vous souhaitez créer.", style: TextStyle(fontSize: 20),),
          ),
          AccordionSection(
            headerText: "Qui est le créateur de cette application ?",
            content: const Text("En réalité, nous sommes 5 développeurs derrière cette application : A.Valentin, F.Pierre-Alexandre, LN.Léopold, O.Théo et W.Lilian. Nous avons réalisé celle-ci lors de notre Licence Professionnelle CIASIE (Conception-Intégration d'Applications et Services Web pour l'Entreprise).", style: TextStyle(fontSize: 20),),
          ),
        ],
      ),
    );
  }

}