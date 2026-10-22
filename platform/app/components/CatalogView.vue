<script setup lang="ts">
import type {
  ResourceSummary,
  PageResult,
  Catalog,
} from '../../shared/types/platform'

defineProps<{ home?: boolean }>()
const route = useRoute(),
  router = useRouter()
const { data: catalog, error: catalogError }
  = await useFetch<Catalog>('/api/v1/catalog')
const keys = ['q', 'major', 'term', 'course', 'topic', 'kind', 'year'] as const
const filters = reactive(
  Object.fromEntries(
    keys.map(k => [
      k,
      String(
        route.query[k]
        || (k === 'topic' && route.path.startsWith('/bo-sung/')
          ? route.path.split('/')[2]
          : '')
        || '',
      ),
    ]),
  ) as Record<(typeof keys)[number], string>,
)
watch(
  () => route.query,
  q =>
    keys.forEach((k) => {
      filters[k] = String(q[k] || '')
    }),
)
const {
  data: results,
  status,
  error,
} = await useFetch<PageResult<ResourceSummary>>('/api/v1/resources', {
  query: computed(() => ({
    ...route.query,
    ...(route.path.startsWith('/bo-sung/')
      ? { topic: route.path.split('/')[2] }
      : {}),
  })),
})
function submit() {
  router.push({
    path: '/hoc-lieu/',
    query: Object.fromEntries(Object.entries(filters).filter(([, v]) => !!v)),
  })
}
function page(offset: number) {
  router.push({
    query: { ...route.query, page: (results.value?.page || 1) + offset },
  })
}
</script>

<template>
  <form
    class="filters"
    role="search"
    @submit.prevent="submit"
  >
    <label class="search-field">Mã hoặc tên môn<input
      v-model="filters.q"
      type="search"
      placeholder="Ví dụ: COMP1800 hoặc giai tich"
    ></label>
    <label>Ngành<select v-model="filters.major">
      <option value="">Tất cả ngành</option>
      <option
        v-for="m in catalog?.majors"
        :key="m.id"
        :value="m.id"
      >
        {{ m.name }}
      </option>
    </select></label>
    <label>Học kỳ<select v-model="filters.term">
      <option value="">Tất cả học kỳ</option>
      <option
        v-for="n in 8"
        :key="n"
        :value="String(n)"
      >
        Học kỳ {{ n }}
      </option>
    </select></label>
    <template v-if="!home">
      <label>Môn<select v-model="filters.course">
        <option value="">Tất cả môn</option>
        <option
          v-for="c in catalog?.courses"
          :key="c.code"
          :value="c.code"
        >
          {{ c.code }} · {{ c.name }}
        </option>
      </select></label>
      <label>Chủ đề<select v-model="filters.topic">
        <option value="">Tất cả chủ đề</option>
        <option
          v-for="t in catalog?.topics"
          :key="t.id"
          :value="t.id"
        >
          {{ t.name }}
        </option>
      </select></label>
      <label>Loại<select v-model="filters.kind">
        <option value="">Tất cả loại</option>
        <option value="ly-thuyet">Bài học</option>
        <option value="bai-tap">Bài tập</option>
        <option value="de-thi">Đề thi</option>
        <option value="cong-thuc">Công thức</option>
        <option value="trac-nghiem">Trắc nghiệm</option>
      </select></label>
      <label>Năm đề thi<input
        v-model="filters.year"
        placeholder="2024-2025"
      ></label>
    </template>
    <button type="submit">
      Tìm môn
    </button><NuxtLink
      v-if="Object.keys(route.query).length"
      to="/hoc-lieu/"
    >Xóa bộ lọc</NuxtLink>
  </form>
  <p
    v-if="catalogError || error"
    role="alert"
  >
    Chưa tải được danh mục. Kiểm tra kết nối và thử tải lại trang.
  </p>
  <template v-else-if="home">
    <h2>Chọn ngành</h2>
    <ul class="major-list">
      <li
        v-for="m in catalog?.majors"
        :key="m.id"
      >
        <NuxtLink :to="`/chuong-trinh/${m.id}/`">{{ m.name }}</NuxtLink>
      </li>
    </ul>
    <h2>Môn có học liệu</h2>
    <ul class="resource-list">
      <li
        v-for="c in catalog?.courses.filter((c) =>
          catalog?.materialCourses.includes(c.code),
        )"
        :key="c.code"
      >
        <NuxtLink :to="c.path"><span class="code">{{ c.code }}</span> {{ c.name }}</NuxtLink>
      </li>
    </ul>
    <p v-if="!catalog?.materialCourses.length">
      Học liệu đang chờ duyệt xuất bản.
    </p>
    <p class="muted">
      Đăng nhập bằng tài khoản đã xác thực để đọc bài, luyện tập và lưu tiến độ.
    </p>
  </template>
  <template v-else>
    <p role="status">
      {{
        status === "pending" ? "Đang tìm…" : `${results?.total || 0} tài liệu`
      }}
    </p>
    <p v-if="results && !results.total">
      Không tìm thấy tài liệu phù hợp. Thử đổi từ khóa hoặc xóa bộ lọc.
    </p>
    <ul class="resource-list">
      <li
        v-for="r in results?.items"
        :key="r.id"
      >
        <NuxtLink :to="r.path">{{ r.title }}</NuxtLink><small>{{ r.course || "Tham khảo theo chủ đề" }} ·
          {{ resourceKindName(r.kind) }} ·
          {{ r.available ? "Đã xuất bản" : "Chờ biên tập" }}</small>
      </li>
    </ul>
    <div
      v-if="results && results.total > 15"
      class="actions"
    >
      <button
        :disabled="results.page === 1"
        @click="page(-1)"
      >
        Trang trước
      </button><span>Trang {{ results.page }}</span><button
        :disabled="results.page * 15 >= results.total"
        @click="page(1)"
      >
        Trang sau
      </button>
    </div>
  </template>
</template>
