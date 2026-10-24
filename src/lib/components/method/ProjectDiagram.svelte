<!--
  ProjectDiagram: the method as one clickable flow in «Проект». Since the fixes wave it is the same
  diagram as in «Введение» (WorkflowDiagram), so both chapters show one consistent picture.
  Props: caption (optional, replaces the default caption).
-->
<script lang="ts">
	import WorkflowDiagram from './WorkflowDiagram.svelte';

	let { caption }: { caption?: string } = $props();
</script>

<WorkflowDiagram {caption} />
