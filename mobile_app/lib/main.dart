import 'package:flutter/material.dart';
import 'package:mobile_app/screens/home.dart';

void main() {
  runApp(const MaterialApp(
    title: '🤝 Reunionou',
    home: MyApp(),
  ));
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: '🤝 Reunionou',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: '🤝 Reunionou'),
    );
  }
}