# Оригинальные мультяшные звуки «21 в кости»

Авторские короткие партитуры в compose.py / scores.json: фишка, снятие фишки, стакан с костями, физический удар, появление очков, набор суммы, зачисление, ничья, проигрыш, открытие и закрытие.
Woodblock, pizzicato, xylophone, clarinet и trombone из той же GeneralUser GS, что у «Бандита». Лицензия: ../licenses/GeneralUser-GS.txt. Музыка не цитирует чужие мелодии.

Рендер: python3 compose.py; swift render.swift /path/GeneralUser-GS.sf2 scores.json /output/directory.
Обработка WAV: highpass=170 Hz, lowpass=4700 Hz, gain×4, limiter 0.85; mono 24kHz MP3 96kb/s.

button/small/triple/jackpot переиспользованы из assets/bandit/audio. На обычную победу играет triple, на 21 — jackpot. Звук удара запускается по audibleImpacts физической модели, а не таймером. Отключение звука останавливает уже звучащие голоса. Закрытие награды обрывает её фанфару; скрытая вкладка молчит.
