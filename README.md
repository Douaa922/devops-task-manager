# Task Manager — Full DevOps Pipeline

## Overview

Task Manager est une application web de gestion de tâches (CRUD) conçue pour démontrer une chaîne DevOps complète et automatisée, allant de la planification jusqu’au monitoring en production.

L’objectif principal n’est pas uniquement fonctionnel, mais architectural et DevOps : mettre en œuvre les bonnes pratiques industrielles (CI/CD, GitOps, containerisation, observabilité).

---

## Tech Stack

### Frontend
- React  
- Nginx (serving)

### Backend
- Node.js (Express)  
- SQLite  

### DevOps & Cloud
- Docker & Docker Hub  
- GitHub Actions (CI)  
- Kubernetes (Minikube)  
- ArgoCD (GitOps / CD)  
- Prometheus (Monitoring)  
- Grafana (Visualization)  
- SonarCloud (Code Quality)  
- Trivy (Security Scan)

---

## DevOps Pipeline

### Continuous Integration (CI)

Déclenchée à chaque push sur main :

- Linting (ESLint)  
- Tests unitaires (Jest)  
- Audit sécurité (npm audit)  
- Analyse qualité (SonarCloud)  
- Build Docker images  
- Scan sécurité (Trivy)  

Objectif : garantir qualité et sécurité avant déploiement.

---

### Continuous Deployment (CD) — GitOps

Basé sur ArgoCD :

1. Les manifests Kubernetes sont versionnés dans Git  
2. ArgoCD surveille le repository  
3. Synchronisation automatique vers le cluster  

Aucune commande kubectl apply manuelle.

---

## Architecture

```text
Developer → GitHub → GitHub Actions (CI)
        → Docker Hub → ArgoCD → Kubernetes
        → Prometheus → Grafana