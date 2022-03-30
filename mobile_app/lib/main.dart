import 'package:flutter/material.dart';
import 'package:mobile_app/data/AllData.dart';
import 'package:mobile_app/screens/home.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        //toutes les classes state
        ChangeNotifierProvider(
          create: (BuildContext context) => All_Data(),
        )
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: '🤝 Reunionou',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: const MyHomePage(title: '🤝 Reunionou'),
      )
    );
  }
}