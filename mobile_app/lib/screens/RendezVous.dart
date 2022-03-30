import 'package:flutter/material.dart';
import 'package:mobile_app/screens/CreationRendezVous.dart';
import 'package:provider/provider.dart';
import 'package:mobile_app/data/AllData.dart';

class RendezVous extends StatefulWidget {
  const RendezVous({Key? key}) : super(key: key);

  @override
  State<RendezVous> createState() => _RendezVousState();
}

class _RendezVousState extends State<RendezVous>{

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.blue,
        title: const Text('Page Rendez vous'),
      ),
      body: SingleChildScrollView(
        child: Center(
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
              Consumer<All_Data>(builder: (context, data, child) {
                data.addAllEvents();
                return Column(
                  children: data.getEventsList(),
                );
              }),
            ],
          ),
        ),
      )
    );
  }
}