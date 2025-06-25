import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:assignment2/main.dart';

void main() {
  testWidgets('Add and delete task test', (WidgetTester tester) async {
    // Build the Task Tracker app
    await tester.pumpWidget(MaterialApp(home: TaskHomePage()));

    // Enter a task into the text field
    await tester.enterText(find.byType(TextField), 'Test Task');

    // Tap the "Add Task" button
    await tester.tap(find.text('Add Task'));
    await tester.pump(); // Rebuild the widget

    // Check if the task was added
    expect(find.text('Test Task'), findsOneWidget);

    // Tap the delete icon
    await tester.tap(find.byIcon(Icons.delete));
    await tester.pump();

    // Check that the task was removed
    expect(find.text('Test Task'), findsNothing);
  });
}
