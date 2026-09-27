import cv2

# Ouvre la caméra par défaut (index 0)
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Erreur : impossible d'ouvrir la caméra")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        print("Erreur : impossible de lire le flux vidéo")
        break

    # Affiche la fenêtre avec le flux
    cv2.imshow("Test Camera", frame)

    # Quitter avec la touche 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
