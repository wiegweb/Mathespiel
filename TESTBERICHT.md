# Testbericht – Zahlenmission Ninja V2 Gesamtmission

Stand: 14.09.2026

## Geprüft

- JavaScript-Syntax mit Node.js: ohne Fehler.
- Aufgaben-Generator: 10.000 vollständige Missionen je Schwierigkeitsgrad (= 540.000 Einzelaufgaben) automatisiert geprüft.
- Zusätzlich 10.000 Aufgaben mit gezielter Reihenwahl 6/7/8/9 geprüft.
- Multiplikation: erwartete Lösung entspricht immer a · b.
- Division: wird aus gültigen Faktoren erzeugt, stets ganzzahlig, Lösung entspricht Dividend : Divisor.
- Fehlender Faktor: eingesetzte Lösung reproduziert immer das Produkt.
- Wahr/Falsch: Wahrheitswert wird gegen das tatsächlich berechnete Produkt geprüft.
- Multiple Choice: vier verschiedene Antwortmöglichkeiten; korrekte Lösung ist genau enthalten.
- Geometrie: alle 18 Aufgaben-Trigger liegen sicher auf Plattformen.
- Maximale Dachlücke: 95 Welt-Einheiten; innerhalb der Sprungmechanik der V2.
- Abschnittslogik: Aufgaben 1–6 Dächer, 7–12 Bambuswald, 13–18 Mondtor.
- Touch-Sicherungen: pointerup / pointercancel / pointerleave sowie blur und visibilitychange setzen Bewegung zurück.

## Bewusste Grenze

Der finale HTTPS-Betrieb auf einem konkreten iPhone/iPad muss nach Veröffentlichung über GitHub Pages praktisch getestet werden. Lokale HTML-Vorschauen unter iOS sind dafür ungeeignet, weil JavaScript dort blockiert werden kann.
