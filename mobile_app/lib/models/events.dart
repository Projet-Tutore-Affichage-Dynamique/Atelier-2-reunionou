class Events {
  final events;

  const Events({
    required this.events
  });

  factory Events.fromJson(Map<String, dynamic> json) {
    return Events(
      events: json['events'],
    );
  }
}
