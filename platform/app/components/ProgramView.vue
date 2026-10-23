<script setup lang="ts">
import type {
  Catalog,
  PageResult,
  ResourceSummary,
} from '../../shared/types/platform'

const props = defineProps<{ major?: string, term?: number, course?: string }>()
const route = useRoute()
const { data, error } = await useFetch<Catalog>('/api/v1/catalog')
const selectedMajor = computed(() =>
  data.value?.majors.find(m => m.id === props.major),
)
const selectedCourse = computed(() =>
  data.value?.courses.find(
    c => c.code.toLowerCase() === props.course?.toLowerCase(),
  ),
)
const selectedCohort = ref(String(route.query.cohort || ''))
watch(
  () => route.query.cohort,
  (value) => {
    selectedCohort.value = String(value || '')
  },
)
const version = computed(() =>
  selectedCohort.value && props.major
    ? data.value?.cohorts.find(c => c.id === selectedCohort.value)?.programs[
      props.major
    ]
    : undefined,
)
const placements = computed(
  () =>
    data.value?.placements.filter(
      p =>
        (!props.major || p.major === props.major)
        && (!version.value || p.version === version.value)
        && (!props.term || p.term === props.term)
        && (!props.course
          || p.course.toLowerCase() === props.course.toLowerCase()),
    ) || [],
)
const fetcher = useRequestFetch()
const { data: resources, error: resourceError, status: resourceStatus, refresh: reloadResources } = await useAsyncData(
  `course-materials-${props.course || 'none'}`,
  async () => {
    if (!props.course) return null
    const first = await fetcher<PageResult<ResourceSummary>>('/api/v1/resources', { query: { course: props.course.toUpperCase(), page: 1 } })
    const items = [...first.items]
    for (let page = 2; items.length < first.total; page++) {
      const next = await fetcher<PageResult<ResourceSummary>>('/api/v1/resources', { query: { course: props.course.toUpperCase(), page } })
      if (!next.items.length) break
      items.push(...next.items)
    }
    return { ...first, items }
  },
)
const materialTabs = computed(() => [
  { id: 'all', name: 'Tất cả' },
  ...['ly-thuyet', 'bai-tap', 'de-thi', 'cong-thuc', 'trac-nghiem']
    .filter(kind => resources.value?.items.some(r => r.kind === kind))
    .map(kind => ({ id: kind, name: resourceKindName(kind) })),
])
const materialTab = useSectionTab(materialTabs, 'all')
const visibleResources = computed(() => resources.value?.items.filter(r => materialTab.value === 'all' || r.kind === materialTab.value) || [])
function cohortChange() {
  navigateTo({
    query: { ...route.query, cohort: selectedCohort.value || undefined },
  })
}
</script>

<template>
  <p class="breadcrumb">
    <NuxtLink to="/">Trang chủ</NuxtLink> /
    <NuxtLink to="/chuong-trinh/">Chương trình học</NuxtLink><template v-if="selectedMajor">
      / {{ selectedMajor.name }}
    </template>
  </p>
  <p
    v-if="error"
    role="alert"
  >
    Chưa tải được chương trình học.
  </p>
  <template v-else-if="course && selectedCourse">
    <h1>{{ selectedCourse.name }}</h1>
    <p class="muted">
      {{ selectedCourse.code }}
    </p>
    <h2>Học liệu</h2>
    <SectionTabs
      v-if="resources?.items.length"
      id="course-materials"
      v-model="materialTab"
      label="Loại học liệu"
      :options="materialTabs"
    />
    <div
      id="course-materials-panel"
      :role="resources?.items.length ? 'tabpanel' : undefined"
      :aria-labelledby="resources?.items.length ? `course-materials-tab-${materialTab}` : undefined"
      class="tab-panel"
    >
      <p
        v-if="resourceStatus === 'pending'"
        role="status"
      >
        Đang tải học liệu…
      </p>
      <div
        v-else-if="resourceError"
        role="alert"
        class="notice"
      >
        Chưa tải được học liệu. <button
          class="quiet"
          @click="reloadResources()"
        >
          Thử lại
        </button>
      </div>
      <ul
        v-else
        class="resource-list"
      >
        <li
          v-for="r in visibleResources"
          :key="r.id"
        >
          <NuxtLink :to="r.path">{{ r.title }}</NuxtLink><small>{{ r.available ? "Đã xuất bản" : "Chờ biên tập" }}</small>
        </li>
      </ul>
      <p v-if="!resourceError && resourceStatus !== 'pending' && !resources?.total">
        Chưa có tài liệu.
        <NuxtLink to="/dong-gop">Đóng góp tài liệu cho môn</NuxtLink>.
      </p>
    </div>
    <h2>Trong chương trình học</h2>
    <ul>
      <li
        v-for="p in placements"
        :key="`${p.major}-${p.term}`"
      >
        {{ data?.majors.find((m) => m.id === p.major)?.name }} · Học kỳ
        {{ p.term }} · {{ p.credits }} tín chỉ · {{ p.requirement }}
      </li>
    </ul>
    <details
      v-if="selectedCourse.importedIssues?.length"
      class="notice"
    >
      <summary>Thông tin học phần cần đối chiếu</summary>
      <p
        v-for="(issue, index) in selectedCourse.importedIssues"
        :key="index"
      >
        <strong v-if="issue.major">{{ data?.majors.find((m) => m.id === issue.major)?.name }}: </strong>{{ issue.note }}
      </p>
    </details>
  </template>
  <template v-else-if="major && selectedMajor">
    <h1>
      {{ selectedMajor.name
      }}<template v-if="term">
        · Học kỳ {{ term }}
      </template>
    </h1>
    <label class="inline-label">Khóa<select
      v-model="selectedCohort"
      @change="cohortChange"
    >
      <option value="">Tất cả khóa</option>
      <option
        v-for="c in data?.cohorts"
        :key="c.id"
        :value="c.id"
      >
        {{ c.id }} · Nhập học {{ c.startYear }}
      </option>
    </select></label>
    <p class="muted">
      Chương trình hiện có cần đối chiếu với đề cương chính thức. Lựa chọn khóa
      không tự giới hạn học kỳ.
    </p>
    <nav
      class="term-nav"
      aria-label="Học kỳ"
    >
      <NuxtLink
        v-for="n in 8"
        :key="n"
        :to="`/chuong-trinh/${major}/hk-${n}/`"
      >Học kỳ {{ n }}</NuxtLink>
    </nav>
    <div class="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Mã môn</th>
            <th>Môn học</th>
            <th>Học kỳ</th>
            <th>Tín chỉ</th>
            <th>Loại học phần</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="p in placements"
            :key="`${p.course}-${p.term}`"
          >
            <td>{{ p.course }}</td>
            <td>
              <NuxtLink :to="`/mon-hoc/${p.course.toLowerCase()}/`">{{
                data?.courses.find((c) => c.code === p.course)?.name
              }}</NuxtLink>
            </td>
            <td>{{ p.term }}</td>
            <td>{{ p.credits }}</td>
            <td>{{ p.requirement }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <template v-else-if="!course && !major">
    <h1>Chương trình học</h1>
    <p
      v-if="selectedCohort"
      class="notice"
    >
      Khóa {{ selectedCohort }} · Nhập học
      {{ data?.cohorts.find((c) => c.id === selectedCohort)?.startYear }}. Chọn
      ngành để xem chương trình áp dụng; chưa xác minh chương trình riêng của
      từng khóa.
    </p>
    <ul class="major-list">
      <li
        v-for="m in data?.majors"
        :key="m.id"
      >
        <NuxtLink
          :to="{
            path: `/chuong-trinh/${m.id}/`,
            query: { cohort: selectedCohort || undefined },
          }"
        >{{ m.name }}</NuxtLink>
      </li>
    </ul>
  </template>
  <p v-else>
    Không tìm thấy môn hoặc chương trình.
  </p>
  <details v-if="placements.length">
    <summary>Nguồn và trạng thái đối chiếu</summary>
    <p
      v-for="p in placements"
      :key="`${p.major}-${p.course}-${p.term}`"
    >
      {{ p.course }}: {{ p.source }} ·
      {{ p.verified ? "Đã xác minh" : "Cần đối chiếu" }}
    </p>
  </details>
</template>
