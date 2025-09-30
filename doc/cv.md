# CV

## 요약

강화학습과 트랜스포머를 도구로 삼아, 객체 검출부터 3D 비전에 이르기까지 컴퓨터 비전의 다양한 문제들을 해결하며 성장하고 있습니다. 제 연구가 실세계의 복잡한 문제를 해결하는 데 작게나마 기여할 수 있기를 바랍니다.

## 기술 스택

* **Programming Languages**:
  * Python (Proficient)
  * C++ (Intermediate)

* **Deep Learning Frameworks**:
  * PyTorch (Proficient)
  * TensorFlow / Keras (Intermediate)

* **Libraries & Tools**:
  * **CV & Data**: OpenCV, NumPy, Pandas, Scikit-learn, Matplotlib
  * **3D Vision**: Open3D, PyTorch3D
  * **Development**: Git, Docker, LaTeX, Visual Studio Code
  * **GPU & Parallel Computing**: CUDA, NCCL

## 주요 연구 분야

### 주 연구 주제

최근 연구는 객체 검출 방법론을 심화하고, 강화학습을 통해 컴퓨터 비전의 기초적인 문제들을 해결하는 데 집중하고 있습니다.

* **강화학습을 이용한 객체 검출 및 에지 검출**
  * `Object detection using policy-based reinforcement learning` (2023)
  * `An adaptive threshold for the canny edge with actor-critic algorithm` (2023)

* **새로운 레이블링/방법론 기반의 객체 검출**
  * `Object Detection Method Using Image and Number of Objects on Image as Label` (2024)

* **Vision Transformer 기반 모델 성능 개선**
  * `Improved Image Classification With Token Fusion` (2023)

### 서브 연구 주제

과거 주요하게 다루었던 연구 분야로, 현재 메인 연구의 기반이 되는 기술들입니다.

* **트랜스포머를 활용한 시맨틱 분할**
  * `태그 라벨과 트랜스포머를 이용한 시맨틱 분할` (2021)
  * `Semantic Segmentation with Perceiver IO` (2022)

* **딥러닝 기반의 무인 감시 시스템**
  *  `무인 감시 Transformer` (2021)

### 현재 진행중인 연구

* **LISA 모델 개선 연구**: 자연어 기반 인스턴스 분할 모델인 LISA의 장면 이해 능력을 높이기 위해, 이미지 전체 맥락을 학습하는 '보조 캡션 손실(auxiliary caption loss)'을 도입하는 연구를 진행 중입니다. 이를 통해 분할 성능과 VLM의 의미론적 이해 능력 간의 관계를 분석하고, 복잡한 주행 환경에서의 분할 성능을 고도화하는 것을 목표로 합니다.

* **VGGT 아키텍처 확장 및 SLAM 적용 연구**: VGGT 모델의 출력을 3D 재구성에 더 적합한 형태로 변환하고, 이를 SLAM(Simultaneous Localization and Mapping)에 활용하기 위한 연구를 진행하고 있습니다. 이를 위해, VGGT의 과잉 예측(over-complete) 전략을 확장하여 새로운 **3D Gaussian Splatting(3DGS) 예측 헤드**를 제안합니다. 이 구조는 기존의 기하학적 예측 결과에 이미지 재구성 손실을 더해, 저자원 환경에서도 더 정확한 3D 장면 표현과 카메라 자세 추정을 가능하게 합니다. 최종적으로는 이 모델을 통해 얻은 안정적인 3D 재구성 결과를 바탕으로 SLAM 시스템을 구축하는 것을 목표로 합니다.

## 연구 실적

| 제목 | 저자 | 게재 정보 |
| :--- | :--- | :--- |
| Object Detection Method Using Image and Number of Objects on Image as Label | KH Choi, JE Ha | IEEE Access, 2024 (SCIE, Q1) |
| An adaptive threshold for the canny edge with actor-critic algorithm | KH Choi, JE Ha | IEEE Access, 2023 (SCIE, Q1) |
| Improved Image Classification With Token Fusion | KH Choi, JW Kim, Y Wang, JE Ha | IEEE Access, 2023 (SCIE, Q1) |
| Object detection using policy-based reinforcement learning | KH Choi, JE Ha | ICCAS, 2023 (Scopus) |
| Random swin transformer | KH Choi, JE Ha | ICCAS, 2022 (Scopus) |
| 객체 검출과 객체 분할 방법의 무인 감시 데이터셋 적용 결과 비교<br>(Results Comparison of Applying Object Detection and Object Segmentation Methods on Visual Surveillance Dataset) | KH Choi, JE Ha | JICROS, 2022 (KCI) |
| Semantic Segmentation with Perceiver IO | KH Choi, JE Ha | ICCAS, 2022 (Scopus) |
| An adaptive threshold for the canny algorithm with deep reinforcement learning | KH Choi, JE Ha | IEEE Access, 2021 (SCIE, Q1) |
| 무인 감시 Transformer<br>(Visual surveillance transformer) | KH Choi, JE Ha | JICROS, 2021 (KCI) |
| 태그 라벨과 트랜스포머를 이용한 시맨틱 분할<br>(Semantic segmentation using TAG label and transformer) | KH Choi, JE Ha | JICROS, 2021 (KCI) |
| Segmentation applying TAG type label data and Transformer | KH Choi, JE Ha | ICCAS, 2021 (Scopus) |
| Visual surveillance transformer | KH Choi, JE Ha | ICCAS, 2021 (Scopus) |
| CNN 을 이용한 태양전지 불량 검출<br>(Defect detection of solar panel using CNN) | KH Choi, JE Ha | JICROS, 2020 (KCI) |
| 주행 이미지의 왜곡에 따른 Semantic segmentation 변화 | 최경훈, 하종은 | KACC, 2020 (Domestic Conference) |
| 에지 비용 함수를 이용한 시맨틱 분할<br>(Semantic segmentation using edge loss) | KH Choi, JE Ha | JICROS, 2020 (KCI) |
| Visual surveillance using deep reinforcement learning | KH Choi, JE Ha | ICCAS, 2020 (Scopus) |
| 에지 분류 CNN 을 이용한 U-Net 기반 에지 검출<br>(Edge detection based-on U-Net using edge classification CNN) | KH Choi, JE Ha | JICROS, 2019 (KCI) |
