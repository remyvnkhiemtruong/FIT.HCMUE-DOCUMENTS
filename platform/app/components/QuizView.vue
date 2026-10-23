<script setup lang="ts">
defineProps<{ embedded?: boolean }>()
interface Question {
  id: number
  question: string
  options: { id: string, text: string }[]
}
interface Result {
  score: number
  total: number
  solutions: { id: number, answer: string, explanation: string }[]
}
const { user } = await useViewer(),
  fetcher = useRequestFetch()
const { data, error } = await useAsyncData('quiz', () =>
  user.value
    ? fetcher<{ revision: string, questions: Question[] }>('/api/v1/quiz')
    : Promise.resolve(null),
)
const answers = ref<Record<string, string>>({}),
  result = ref<Result | null>(null),
  message = ref(''),
  busy = ref(false)
async function submit() {
  busy.value = true
  try {
    result.value = await $fetch<Result>('/api/v1/quiz/attempts', {
      method: 'POST',
      body: { revision: data.value?.revision, answers: answers.value },
    })
    message.value = ''
  }
  catch {
    message.value
      = 'Trả lời đủ câu hỏi trước khi nộp. Nếu bài đã thay đổi, hãy tải lại trang.'
  }
  finally {
    busy.value = false
  }
}
function reset() {
  result.value = null
  answers.value = {}
  message.value = ''
}
</script>

<template>
  <h1 v-if="!embedded">
    Trắc nghiệm ôn tập
  </h1>
  <LoginNotice v-if="!user" />
  <p v-else-if="error">
    Chưa tải được bài luyện tập.
  </p>
  <form
    v-else-if="data"
    @submit.prevent="submit"
  >
    <p>Luyện tập để tự kiểm tra; kết quả không phải điểm học phần.</p>
    <fieldset
      v-for="q in data.questions"
      :key="q.id"
      :disabled="!!result"
    >
      <legend>Câu {{ q.id }}</legend>
      <SafeHtml
        as="div"
        class="article"
        :html="q.question"
      />
      <label
        v-for="o in q.options"
        :key="o.id"
        class="choice"
      ><input
        v-model="answers[q.id]"
        type="radio"
        :name="`question-${q.id}`"
        :value="o.id"
        required
      ><span>{{ o.id }}.</span><SafeHtml
        as="span"
        class="article"
        :html="o.text"
      /></label>
      <div
        v-if="result"
        class="notice"
      >
        <strong>Đáp án:
          {{ result.solutions.find((s) => s.id === q.id)?.answer }}</strong>
        <SafeHtml
          as="div"
          class="article"
          :html="result.solutions.find((s) => s.id === q.id)?.explanation"
        />
      </div>
    </fieldset>
    <button
      v-if="!result"
      :disabled="busy"
    >
      Chấm bài
    </button><template v-else>
      <p role="status">
        Kết quả: {{ result.score }}/{{ result.total }}
      </p>
      <button
        type="button"
        @click="reset"
      >
        Làm lại
      </button>
    </template>
    <p role="alert">
      {{ message }}
    </p>
  </form>
</template>
