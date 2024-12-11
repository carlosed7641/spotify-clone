<script lang="ts">
    const currentTime = new Date()
    const curentHour = currentTime.getHours()

    let greeting = 'Buenos días'

    if (curentHour >= 12 && curentHour < 18) {
        greeting = 'Buenas tardes'
    } else if (curentHour >= 18 && curentHour < 24) {
        greeting = 'Buenas noches'
    }
</script>

<h1 class="text-3xl font-bold">{greeting}</h1>