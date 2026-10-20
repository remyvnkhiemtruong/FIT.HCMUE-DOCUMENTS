<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { data as questions } from '../../data/quiz.data'
const answers=ref<Record<number,string>>({})
const submitted=ref(false)
const ready=ref(false)
onMounted(()=>{ready.value=true})
const score=computed(()=>questions.filter(q=>answers.value[q.id]===q.answer).length)
const answered=computed(()=>Object.keys(answers.value).length)
function reset() {answers.value={};submitted.value=false}
</script>
<template>
  <form class="quiz" :aria-busy="!ready" @submit.prevent="submitted=true">
    <p>{{questions.length}} câu hỏi · Đã chọn {{answered}} câu. Bạn có thể nộp bài khi chưa trả lời hết.</p>
    <fieldset v-for="q in questions" :key="q.id" class="quiz-question" :disabled="submitted || !ready">
      <legend><strong>Câu {{q.id}}.</strong> <span v-html="q.questionHtml"></span></legend>
      <label v-for="option in q.options" :key="option.id" class="quiz-option" :class="{selected:answers[q.id]===option.id}"><input v-model="answers[q.id]" type="radio" :name="'question-'+q.id" :value="option.id"><strong>{{option.id}}.</strong><span v-html="option.html"></span></label>
      <div v-if="submitted" class="quiz-explanation"><p><strong>{{answers[q.id]===q.answer ? 'Chính xác.' : 'Chưa chính xác.'}} Đáp án: {{q.answer}}.</strong></p><p v-html="q.explanationHtml"></p></div>
    </fieldset>
    <button v-if="!submitted" type="submit" class="primary-button" :disabled="!ready">Nộp bài & Xem điểm</button>
    <div v-else><p role="status" class="quiz-score">Kết quả: {{score}} / {{questions.length}} câu đúng ({{(score/questions.length*10).toFixed(1)}} điểm).</p><button type="button" class="secondary-button" @click="reset">Làm lại bài thi</button></div>
  </form>
</template>
