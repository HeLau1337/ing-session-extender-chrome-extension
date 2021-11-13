# Automatic Session Extender for ING Banking
A Chrome Extension for automatically refreshing an ING online banking session.

Diese kleine Chrome Erweiterung sorgt dafür, dass man beim ING Online Banking nicht immer nach 5 Minuten automatisch ausgeloggt wird, solange noch ein Tab geöffnet ist. 

Die Erweiterung sammelt keinerlei Nutzerdaten und wertet keine solcher Daten aus. Das Einzige, was passiert, ist, dass regelmäßig automatisiert auf den "Sitzungsverlängerungs-Button" oben rechts auf der ING Online Banking Website gedrückt wird. Dadurch wird der 5-Minuten-Timer regelmäßig zurückgesetzt.
Man wird allerdings weiterhin abgemeldet, sobald man alle ING-Tabs seit mindestens 5 Minuten geschlossen hat oder den Browser schließt. Ein manueller Logout ist selbstverständlich auch jederzeit möglich.

- funktioniert auf https://banking.ing.de/
- kann ein- und ausgeschaltet werden
- erweiterte Optionen: 
    - Zeit-Intervall der Sitzungsverlängerung verändern (Standard: spätestens alle 60 Sek. wird automatisiert auf den "Sitzungsverlängerungs-Button" gedrückt)
    - CSS-Klasse ändern, die den "Sitzungsverlängerungs-Button" auf der Online Banking Website identifiziert (falls sich diese zukünftig ändern sollte)

Hinweis: Hierbei handelt es sich um keine offizielle Software der ING-DiBa AG!
