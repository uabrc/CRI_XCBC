const table = {
  "interactive": { "max_cpu": 48, "max_hour": 2, "max_gpu": 0 },
  "express": { "max_cpu": 48, "max_hour": 2, "max_gpu": 0 },
  "short": { "max_cpu": 48, "max_hour": 12, "max_gpu": 0 },
  "pascalnodes": { "max_cpu": 28, "max_hour": 12, "max_gpu": 4 },
  "pascalnodes-medium": { "max_cpu": 28, "max_hour": 48, "max_gpu": 4 },
  "medium": { "max_cpu": 48, "max_hour": 50, "max_gpu": 0 },
  "long": { "max_cpu": 48, "max_hour": 150, "max_gpu": 0 },
  "intel-dcb": { "max_cpu": 24, "max_hour": 150, "max_gpu": 0 },
  "amd-hdr100": { "max_cpu": 128, "max_hour": 150, "max_gpu": 0 },
  "largemem": { "max_cpu": 24, "max_hour": 50, "max_gpu": 0 },
  "largemem-long": { "max_cpu": 24, "max_hour": 150, "max_gpu": 0 },
  "amperenodes": { "max_cpu": 128, "max_hour": 12, "max_gpu": 2 },
  "amperenodes-medium": { "max_cpu": 128, "max_hour": 48, "max_gpu": 2 },
}

function set_max_value(form_id, value) {
  const form_element = $(form_id);
  form_element.attr({'max': value});
}

function set_partition_change_handler() {
  let partition_select = $("#batch_connect_session_context_bc_partition");
  partition_select.change( function(e) {
    toggle_gpu_visibility(e);
  });
}

function toggle_gpu_visibility(event) {
  const partition = event.target.value;
  const cpu_selector = '#batch_connect_session_context_bc_num_slots';
  const gpu_selector = '#batch_connect_session_context_bc_num_gpus';
  const hour_selector = '#batch_connect_session_context_bc_num_hours';

  toggle_visibilty_of_form_group(gpu_selector, table[partition]["max_gpu"] != -1);
  set_max_value(cpu_selector, table[partition]["max_cpu"]);
  set_max_value(gpu_selector, table[partition]["max_gpu"]);
  set_max_value(hour_selector, table[partition]["max_hour"]);
}

function toggle_visibilty_of_form_group(form_id, show) {
  let form_element = $(form_id);
  let parent = form_element;

  while (
    (! parent[0].classList.contains('form-group')) &&
    (! parent.is('html')) // ensure that we don't loop infinitely
  ) {
    parent = parent.parent();
  }

  // If parent is HTML then something has gone wrong and visibility should not be changed
  if ( parent.is('html') ) {
    return;
  }

  if(show) {
    parent.show();
  } else {
    parent.hide();
  }
}

toggle_gpu_visibility(
  // Fake the event
  { target: document.querySelector('#batch_connect_session_context_bc_partition') }
);
set_partition_change_handler();
