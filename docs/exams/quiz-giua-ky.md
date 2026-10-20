# 📝 Trắc Nghiệm Ôn Thi Giữa Kỳ (Interactive Quiz)

Bài kiểm tra giữa kỳ học phần **COMP1800** có hình thức **trắc nghiệm 60 phút (20% điểm số)**. Dưới đây là bộ câu hỏi trắc nghiệm tương tác giúp bạn tự luyện tập và chấm điểm tức thì.

---

<script setup>
import { ref, computed } from 'vue'

const questions = [
  {
    id: 1,
    question: "Tính giới hạn $L = \\lim_{x \\to 0} \\frac{\\ln(1 + 3x)}{\\sin 2x}$:",
    options: [
      { id: 'A', text: "L = 0" },
      { id: 'B', text: "L = 1" },
      { id: 'C', text: "L = 3/2" },
      { id: 'D', text: "L = 2/3" }
    ],
    answer: 'C',
    explanation: "Khi $x \\to 0$, theo VCB tương đương: $\\ln(1+3x) \\sim 3x$ và $\\sin 2x \\sim 2x$. Do đó $L = \\lim_{x \\to 0} \\frac{3x}{2x} = \\frac{3}{2}$."
  },
  {
    id: 2,
    question: "Tính giới hạn $I = \\lim_{x \\to \\infty} \\left(1 + \\frac{2}{x}\\right)^x$:",
    options: [
      { id: 'A', text: "I = 1" },
      { id: 'B', text: "I = e" },
      { id: 'C', text: "I = e^2" },
      { id: 'D', text: "I = +\\infty" }
    ],
    answer: 'C',
    explanation: "Dạng $1^\\infty$: Áp dụng công thức $\\lim [u(x)]^{v(x)} = e^{\\lim (u-1)v} = e^{\\lim \\frac{2}{x} \\cdot x} = e^2$."
  },
  {
    id: 3,
    question: "Đạo hàm của hàm số $y = x^x$ với $x > 0$ là:",
    options: [
      { id: 'A', text: "y' = x \\cdot x^{x-1}" },
      { id: 'B', text: "y' = x^x \\ln x" },
      { id: 'C', text: "y' = x^x (\\ln x + 1)" },
      { id: 'D', text: "y' = x^x" }
    ],
    answer: 'C',
    explanation: "Lấy logarit tự nhiên: $\\ln y = x \\ln x \\implies \\frac{y'}{y} = \\ln x + x \\cdot \\frac{1}{x} = \\ln x + 1 \\implies y' = x^x(\\ln x + 1)$."
  },
  {
    id: 4,
    question: "Tính định thức $D = \\begin{vmatrix} 3 & -1 \\\\ 2 & 4 \\end{vmatrix}$:",
    options: [
      { id: 'A', text: "D = 10" },
      { id: 'B', text: "D = 14" },
      { id: 'C', text: "D = 12" },
      { id: 'D', text: "D = -14" }
    ],
    answer: 'B',
    explanation: "$D = 3 \\cdot 4 - (-1) \\cdot 2 = 12 + 2 = 14$."
  },
  {
    id: 5,
    question: "Cho ma trận vuông $A$ cấp 3 có $\\det(A) = 2$. Tính $\\det(2A)$:",
    options: [
      { id: 'A', text: "4" },
      { id: 'B', text: "8" },
      { id: 'C', text: "16" },
      { id: 'D', text: "32" }
    ],
    answer: 'C',
    explanation: "Với ma trận vuông cấp $n$, ta có tính chất $\\det(kA) = k^n \\det(A)$. Ở đây $n = 3, k = 2 \\implies \\det(2A) = 2^3 \\cdot 2 = 8 \\cdot 2 = 16$."
  },
  {
    id: 6,
    question: "Điều kiện cần và đủ để ma trận vuông $A$ có ma trận nghịch đảo $A^{-1}$ là:",
    options: [
      { id: 'A', text: "det(A) > 0" },
      { id: 'B', text: "det(A) ≠ 0" },
      { id: 'C', text: "rank(A) < n" },
      { id: 'D', text: "A là ma trận đối xứng" }
    ],
    answer: 'B',
    explanation: "Ma trận vuông khả nghịch khi và chỉ khi $\\det(A) \\neq 0$ (tức ma trận không suy biến, $\\text{rank}(A) = n$)."
  },
  {
    id: 7,
    question: "Khai triển Maclaurin của hàm số $f(x) = \\cos x$ đến cấp 2 là:",
    options: [
      { id: 'A', text: "1 - x + o(x)" },
      { id: 'B', text: "1 - x^2/2 + o(x^2)" },
      { id: 'C', text: "1 + x^2/2 + o(x^2)" },
      { id: 'D', text: "x - x^3/6 + o(x^3)" }
    ],
    answer: 'B',
    explanation: "Theo công thức Maclaurin: $\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots = 1 - \\frac{x^2}{2} + o(x^2)$."
  },
  {
    id: 8,
    question: "Tích phân xác định $\\int_0^1 x e^x dx$ có giá trị bằng:",
    options: [
      { id: 'A', text: "1" },
      { id: 'B', text: "e" },
      { id: 'C', text: "e - 1" },
      { id: 'D', text: "2" }
    ],
    answer: 'A',
    explanation: "Tích phân từng phần: $\\int_0^1 x e^x dx = [x e^x]_0^1 - \\int_0^1 e^x dx = (1 \\cdot e - 0) - [e^x]_0^1 = e - (e - 1) = 1$."
  },
  {
    id: 9,
    question: "Trong $\\mathbb{R}^2$, tích vô hướng chính tắc của $u = (1, 2)$ và $v = (-2, 1)$ bằng:",
    options: [
      { id: 'A', text: "0 (hai vectơ trực giao)" },
      { id: 'B', text: "4" },
      { id: 'C', text: "-4" },
      { id: 'D', text: "1" }
    ],
    answer: 'A',
    explanation: "$\\langle u, v \\rangle = 1(-2) + 2(1) = -2 + 2 = 0$. Vì tích vô hướng bằng 0 nên hai vectơ trực giao."
  },
  {
    id: 10,
    question: "Hệ phương trình thuần nhất $AX = 0$ có nghiệm không tầm thường khi và chỉ khi:",
    options: [
      { id: 'A', text: "rank(A) = n" },
      { id: 'B', text: "rank(A) < n" },
      { id: 'C', text: "det(A) ≠ 0" },
      { id: 'D', text: "Hệ vô nghiệm" }
    ],
    answer: 'B',
    explanation: "Hệ thuần nhất luôn có nghiệm tầm thường $X = 0$. Để có thêm nghiệm khác 0 thì số ẩn tự do $n - \\text{rank}(A) > 0 \\iff \\text{rank}(A) < n$."
  }
]

const userAnswers = ref({})
const isSubmitted = ref(false)

const score = computed(() => {
  let count = 0
  questions.forEach(q => {
    if (userAnswers.value[q.id] === q.answer) {
      count++
    }
  })
  return count
})

function selectOption(qId, optId) {
  if (!isSubmitted.value) {
    userAnswers.value[qId] = optId
  }
}

function submitQuiz() {
  isSubmitted.value = true
}

function resetQuiz() {
  userAnswers.value = {}
  isSubmitted.value = false
}
</script>

<ClientOnly>
<div class="quiz-container" style="margin-top: 20px;">
  <div v-for="q in questions" :key="q.id" class="quiz-card" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; padding: 18px; margin-bottom: 20px; background-color: var(--vp-c-bg-soft);">
    <h3 style="margin-top: 0; font-size: 1.05rem;">
      <span style="background: var(--vp-c-brand-1); color: white; padding: 2px 8px; border-radius: 4px; margin-right: 8px; font-size: 0.85rem;">Câu {{ q.id }}</span>
      <span>{{ q.question }}</span>
    </h3>

    <div class="options-list" style="display: flex; flex-direction: column; gap: 8px; margin: 12px 0;">
      <div 
        v-for="opt in q.options" 
        :key="opt.id"
        @click="selectOption(q.id, opt.id)"
        :style="{
          padding: '10px 14px',
          borderRadius: '6px',
          border: '1px solid ' + (userAnswers[q.id] === opt.id ? 'var(--vp-c-brand-1)' : 'var(--vp-c-border)'),
          backgroundColor: userAnswers[q.id] === opt.id ? 'var(--vp-c-brand-soft)' : 'var(--vp-c-bg)',
          cursor: isSubmitted ? 'default' : 'pointer',
          fontWeight: userAnswers[q.id] === opt.id ? '600' : 'normal',
          transition: 'all 0.2s'
        }"
      >
        <strong>{{ opt.id }}.</strong> {{ opt.text }}
      </div>
    </div>

    <div v-if="isSubmitted" style="margin-top: 12px; padding: 10px 14px; border-radius: 6px;" :style="{ backgroundColor: userAnswers[q.id] === q.answer ? '#e6f7ec' : '#fde8e8', color: userAnswers[q.id] === q.answer ? '#0e623b' : '#9c1a1a' }">
      <div style="font-weight: bold; margin-bottom: 4px;">
        {{ userAnswers[q.id] === q.answer ? '✅ Chính xác!' : '❌ Chưa chính xác. Đáp án đúng là: ' + q.answer }}
      </div>
      <div style="font-size: 0.9rem;"><strong>Giải thích:</strong> {{ q.explanation }}</div>
    </div>
  </div>

  <div style="text-align: center; margin: 30px 0;">
    <button 
      v-if="!isSubmitted" 
      @click="submitQuiz"
      style="background: var(--vp-c-brand-1); color: white; border: none; padding: 12px 30px; font-size: 1.1rem; border-radius: 8px; cursor: pointer; font-weight: bold;"
    >
      🎯 Nộp Bài & Xem Điểm
    </button>
    <div v-else>
      <div style="font-size: 1.4rem; font-weight: bold; margin-bottom: 12px; color: var(--vp-c-brand-1);">
        Kết quả của bạn: {{ score }} / {{ questions.length }} câu đúng ({{ (score / questions.length * 10).toFixed(1) }} điểm)
      </div>
      <button 
        @click="resetQuiz"
        style="background: var(--vp-c-bg-mute); border: 1px solid var(--vp-c-border); padding: 10px 24px; font-size: 1rem; border-radius: 8px; cursor: pointer;"
      >
        🔄 Làm Lại Bài Thi
      </button>
    </div>
  </div>
</div>
</ClientOnly>

::: tip LƯU Ý KHI LÀM BÀI TRẮC NGHIỆM GIỮA KỲ
- Khi tính các giới hạn vô định $\left[\frac{0}{0}\right]$ hoặc $[1^\infty]$, ưu tiên sử dụng **Vô cùng bé tương đương** hoặc công thức tính nhanh dạng mũ để tiết kiệm thời gian bấm máy.
- Với bài toán ma trận vuông, nhớ kiểm tra nhanh $\det(kA) = k^n \det(A)$ để tránh bẫy nhân nhầm cấp của ma trận.
:::
