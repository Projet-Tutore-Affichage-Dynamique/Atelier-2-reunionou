import 'package:flutter/material.dart';

class CreationRendezVous extends StatefulWidget {
  const CreationRendezVous({Key? key}) : super(key: key);

  @override
  State<CreationRendezVous> createState() => _CreationRendezVousState();
}

class _CreationRendezVousState extends State<CreationRendezVous>{
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.grey,
        title: const Text('Page Creation Rendez vous'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [

          ],
        ),
      ),
    );
  }
}