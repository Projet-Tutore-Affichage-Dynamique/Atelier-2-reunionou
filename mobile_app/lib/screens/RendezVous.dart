import 'package:flutter/material.dart';
import 'package:mobile_app/screens/ConnexionPage.dart';
import 'package:mobile_app/screens/CreationRendezVous.dart';

class RendezVous extends StatefulWidget {
  const RendezVous({Key? key}) : super(key: key);

  @override
  State<RendezVous> createState() => _RendezVousState();
}

class _RendezVousState extends State<RendezVous>{

  final List<Widget> _eventsList = [];

  Widget _event(currentEvent) {
    return Container(
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Padding(
        padding: const EdgeInsets.all(10.0),
        child: SizedBox(
          width: 300,
          child: Column(
            children: [
              Text(
                'titre'+currentEvent.titre,
                style: const TextStyle(fontSize: 20),
                textAlign: TextAlign.center,
              ),
              Text(
                'description'+currentEvent.description,
                style: const TextStyle(fontSize: 15),
                textAlign: TextAlign.center,
              ),
              Text(
                'date'+currentEvent.date_RV,
                style: const TextStyle(fontSize: 10),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _addAllEvents() {
    setState(() {
      for(var adding in eventList){
        _eventsList.add(_event(adding));
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    _addAllEvents();
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.blue,
        title: const Text('Page Rendez vous'),
      ),
      body: Center(
        child: Column(
          children: [
            Container(
              alignment: Alignment.topCenter,
              child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: SizedBox(
                  child: Column(
                    children: [
                      const Text(
                        'Mes événements',
                        style: TextStyle(fontSize: 40),
                        textAlign: TextAlign.center,
                      ),
                      ElevatedButton(
                        style: ButtonStyle(
                          backgroundColor: MaterialStateProperty.all<Color>(Colors.blue),
                        ),
                        onPressed: () {
                          Navigator.pop(context);
                          setState(() {});
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) => const CreationRendezVous()),
                          );
                        },
                        child: const Text(
                          'Créer un événement',
                          style: TextStyle(fontSize: 25),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            const Padding(
              padding: EdgeInsets.fromLTRB(10, 0, 10, 10),
              child: Text(
                'Ils arrivent bientôt',
                style: TextStyle(fontSize: 30),
                textAlign: TextAlign.center,
              ),
            ),
            Column(
              children: _eventsList,
            ),
          ],
        ),
      ),
    );
  }
}