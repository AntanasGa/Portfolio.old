<template>
  <div class="background-mask">
    <div
      class="background-mask__dot"
      :class="{
        dark:
          lighting.mode == 'dark' ||
          (lighting.mode == 'auto' && lighting.preferred == 'dark'),
      }"
    ></div>
    <div
      class="background-mask__vibe"
      :style="{
        filter: `hue-rotate(${rotation[$route.name as string]?.rotate || 0}deg)`,
      }"
    ></div>
    <div class="background-mask__blob">
      <svg
        class="three"
        width="360"
        height="360"
        viewBox="0 0 31.75 31.75"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          style="stroke-width: 2px"
          :style="{
            fill: rotation[$route.name as string]?.blob || rotation['home']?.blob,
          }"
          :d="triBlob[0]"
        >
          <animate
            attributeName="d"
            dur="15s"
            repeatCount="indefinite"
            :values="`${triBlob.join(';')};${triBlob[0]}`"
          />
        </path>
      </svg>
      <svg
        class="four"
        width="360"
        height="360"
        viewBox="0 0 31.75 31.75"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          style="stroke-width: 2px"
          :style="{
            fill: rotation[$route.name as string]?.blob || rotation['home']?.blob,
          }"
          :d="quadBlob[0]"
        >
          <animate
            attributeName="d"
            dur="12.5s"
            repeatCount="indefinete"
            :values="`${quadBlob.join(';')};${quadBlob[0]}`"
          />
        </path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { useLightingStore } from '@/stores/lighting'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const lighting = useLightingStore()
    return { lighting }
  },
  data() {
    return {
      triBlob: [
        'M 2.3847372,13.884006 C 2.8250009,18.108326 10.558324,30.734703 21.494507,24.982064 32.43069,19.229425 31.310759,4.6324188 22.95775,4.9054272 17.402494,5.0869942 2.3847372,13.884006 2.3847372,13.884006 Z',
        'M 5.4751169,17.135285 C -7.0330047,26.892228 12.067297,37.881834 26.317728,26.916651 41.092126,15.548294 19.43531,-7.5243373 10.624295,6.8708894 7.9349712,11.264643 5.4751169,17.135285 5.4751169,17.135285 Z',
        'M 5.7032496,23.251377 C 6.9710235,25.330625 11.334002,35.172124 26.578438,27.403667 43.188085,18.939507 1.8762399,-9.4378733 2.2067976,4.3903816 2.3299056,9.5403697 5.7032496,23.251377 5.7032496,23.251377 Z',
      ],
      quadBlob: [
        'M 6.9151265,8.0522647 C 13.637801,1.9828847 19.059977,2.8851026 27.274999,2.8634188 34.532369,2.8442627 31.397575,24.909205 19.536014,29.724266 8.4748969,34.214396 0.07565704,25.561965 1.8824922,20.936293 Z',
        'M 14.976608,15.865189 C 21.699283,9.795809 22.128635,9.2666992 27.274999,2.8634188 34.723842,-6.4046847 31.397575,24.909205 19.536014,29.724266 8.4748969,34.214396 -2.7483851,22.729745 1.8824922,20.936293 Z',
        'M 3.9119556,10.365995 C 10.742884,14.144568 8.163039,22.471468 26.266738,1.6889184 32.333318,-5.2753488 29.537231,12.449709 23.369133,25.058351 18.123299,35.781728 10.607854,14.046934 1.0098067,21.154084 Z',
      ],
      rotation: {
        home: { rotate: 0, blob: '#12D19Eaa' },
        projects: { rotate: 40, blob: '#12a5d1ab' },
      } as { [key: string]: { rotate: number; blob: string } },
    }
  },
})
</script>
