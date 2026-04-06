<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Teclado {
  id: number;
  titulo: string;
  descricao: string;
  comprado?: boolean;
}

const teclados = ref<Teclado[]>([])
const comprados = ref<Teclado[]>([])
const removidos = ref<Teclado[]>([])

const pressTimer = ref<any>(null);
const deletingId = ref<number | null>(null);

// Função para salvar o estado atual no LocalStorage
const salvarNoStorage = () => {
  const listaCompleta = [...teclados.value, ...comprados.value];
  localStorage.setItem('minha_colecao', JSON.stringify(listaCompleta));
  localStorage.setItem('historico_removidos', JSON.stringify(removidos.value));
};

// Alteração principal: Agora carrega do navegador, não de uma API externa
const carregarDados = () => {
  const dadosBrutos = localStorage.getItem('minha_colecao');
  const removidosBrutos = localStorage.getItem('historico_removidos');

  if (dadosBrutos) {
    const lista = JSON.parse(dadosBrutos);
    teclados.value = lista.filter((t: Teclado) => !t.comprado);
    comprados.value = lista.filter((t: Teclado) => t.comprado);
  }

  if (removidosBrutos) {
    removidos.value = JSON.parse(removidosBrutos);
  }
};

const marcarComoComprado = (id: number) => {
  const index = teclados.value.findIndex(t => t.id === id)
  if (index !== -1) {
    const item = { ...teclados.value[index], comprado: true }
    comprados.value.push(item)
    teclados.value.splice(index, 1)
    salvarNoStorage(); // Atualiza o armazenamento
  }
}

const startLongPress = (id: number, lista: 'comprados' | 'removidos') => {
  deletingId.value = id;
  pressTimer.value = setTimeout(() => {
    if (lista === 'comprados') {
      const item = comprados.value.find(t => t.id === id);
      if (item) {
        removidos.value.push(item);
        comprados.value = comprados.value.filter(t => t.id !== id);
      }
    } else {
      removidos.value = removidos.value.filter(t => t.id !== id);
    }
    deletingId.value = null;
    salvarNoStorage(); // Atualiza o armazenamento
  }, 1500);
};

const cancelLongPress = () => { clearTimeout(pressTimer.value); deletingId.value = null; };

const excluirImediato = (id: number) => {
  const item = teclados.value.find(t => t.id === id);
  if (item) {
    removidos.value.push(item);
    teclados.value = teclados.value.filter(t => t.id !== id);
    salvarNoStorage(); // Atualiza o armazenamento
  }
};

const limparHistorico = () => { 
  removidos.value = []; 
  localStorage.removeItem('historico_removidos');
};

onMounted(carregarDados)
</script>

<template>
  <div class="bg-glow">
    <div class="glow-1"></div>
  </div>

  <nav class="navbar">
    <div class="nav-content">
      <div class="left-group">
        <div class="nav-logo">CA</div>
      </div>
      <div class="links-area">
        <div class="nav-links-container">
          <a href="https://techcarlosandre.github.io/portfolio-carlos/">Início</a>
          <a href="https://techcarlosandre.github.io/Keyboards/">Teclados</a>
          <a href="#" class="active">Lista</a>
        </div>
      </div>
    </div>
  </nav>

  <div class="container animate-up">
    <header class="main-title">
      <h1>Minha Coleção</h1>
    </header>
    
    <section class="section-group">
      <div class="banner banner-white">Lista de Desejos</div>
      <div v-if="teclados.length > 0">
        <div v-for="t in teclados" :key="t.id" class="swipe-container">
          <div class="action-buttons">
            <button @click="excluirImediato(t.id)" class="btn-action btn-red-swipe">✕</button>
            <button @click="marcarComoComprado(t.id)" class="btn-action btn-green-swipe">✓</button>
          </div>
          <div class="keyboard-card border-white-left">
            <h3 class="text-white-title">{{ t.titulo }}</h3>
            <p class="desc-center">{{ t.descricao }}</p>
          </div>
        </div>
      </div>
      <p v-else class="empty-text">Lista de desejos vazia.</p>
    </section>

    <section v-if="comprados.length > 0" class="section-group">
      <div class="banner banner-green">Já Adquiridos ✅</div>
      <div v-for="c in comprados" :key="'c-'+c.id" 
            class="keyboard-card border-green-left"
            :class="{ 'is-deleting': deletingId === c.id }">
        <div class="card-header">
          <h3 class="text-green-title">{{ c.titulo }}</h3>
          <button @mousedown="startLongPress(c.id, 'comprados')" @mouseup="cancelLongPress" @mouseleave="cancelLongPress"
            @touchstart="startLongPress(c.id, 'comprados')" @touchend="cancelLongPress" class="btn-x">✕</button>
        </div>
        <p class="desc-center">{{ c.descricao }}</p>
        <div v-if="deletingId === c.id" class="progress-line"></div>
      </div>
    </section>

    <section v-if="removidos.length > 0" class="section-group">
      <div class="banner banner-red">Removidos 🗑️</div>
      <div class="clear-bar">
        <button @click="limparHistorico" class="btn-clear-outline">LIMPAR TUDO</button>
      </div>
      <div v-for="r in removidos" :key="'r-'+r.id" 
            class="keyboard-card border-red-left"
            :class="{ 'is-deleting': deletingId === r.id }">
        <div class="card-header">
          <h3 class="text-red-title">{{ r.titulo }}</h3>
          <button @mousedown="startLongPress(r.id, 'removidos')" @mouseup="cancelLongPress" @mouseleave="cancelLongPress"
            @touchstart="startLongPress(r.id, 'removidos')" @touchend="cancelLongPress" class="btn-x">✕</button>
        </div>
        <p class="desc-center">{{ r.descricao }}</p>
        <div v-if="deletingId === r.id" class="progress-line"></div>
      </div>
    </section>
  </div>
</template>

<style>
/* Estilos mantidos conforme sua solicitação anterior, garantindo o padrão visual */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800&family=League+Gothic&display=swap');

:root {
  --primaria: #cc0000;
  --secundaria: #ff3b3b;
  --verde: #28a745;
  --cinza-card: #151515;
  --preto-site: #050505;
  --fonte-destaque: 'League Gothic', sans-serif;
  --fonte-principal: 'Montserrat', sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body { 
  background-color: var(--preto-site); 
  color: #ffffff; 
  font-family: var(--fonte-principal); 
  overflow-x: hidden;
  font-size: 16px;
}

.navbar { 
  position: fixed; 
  top: 0; 
  left: 0;
  width: 100%;
  height: 80px; 
  background: rgba(0, 0, 0, 0.8); 
  backdrop-filter: blur(15px);
  z-index: 9999; 
  border-bottom: 1px solid rgba(255,255,255,0.05); 
  display: flex;
  align-items: center;
}

.nav-content { 
  width: 100%;
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-group { display: flex; align-items: center; }

.nav-logo { 
  font-family: Helvetica, sans-serif;
  color: var(--secundaria); 
  font-size: 2.5rem; 
  font-weight: bold;
  letter-spacing: 2px;
  text-shadow: 0 0 15px rgba(204, 0, 0, 0.4);
}

.nav-links-container {
  display: flex;
  gap: 20px;
  background: rgba(255, 255, 255, 0.03);
  padding: 10px 25px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-links-container a { 
  color: rgba(255,255,255,0.5); 
  text-decoration: none; 
  font-size: 0.75rem; 
  text-transform: uppercase; 
  font-weight: 700; 
  transition: 0.3s;
  letter-spacing: 1px;
}

.nav-links-container a.active, .nav-links-container a:hover { 
  color: #fff; 
  text-shadow: 0 0 10px var(--secundaria); 
}

.animate-up { animation: fadeInUp 0.8s ease-out forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

.container { max-width: 800px; margin: 140px auto 100px; padding: 0 20px; position: relative; z-index: 10; }

.main-title h1 { 
  text-align: center; 
  font-family: var(--fonte-destaque);
  font-size: 5rem; 
  text-transform: uppercase;
  color: var(--claro);
  margin-bottom: 50px;
  line-height: 0.9;
}

.section-group { margin-top: 60px; }
.banner { 
  background: rgba(255,255,255,0.03); 
  padding: 12px; 
  text-align: center; 
  font-weight: 700; 
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 25px; 
  width: 100%; 
  border-left: 5px solid transparent; 
}
.banner-white { border-left-color: #fff; }
.banner-green { border-left-color: var(--verde); color: var(--verde); }
.banner-red { border-left-color: var(--primaria); color: var(--primaria); }

.keyboard-card {
  background: var(--cinza-card);
  padding: 25px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.05);
  position: relative;
  z-index: 2;
  transition: 0.4s ease;
}

.keyboard-card h3 { font-weight: 800; letter-spacing: -0.5px; }
.border-white-left { border-left: 8px solid #fff; }
.border-green-left { border-left: 8px solid var(--verde); }
.border-red-left { border-left: 8px solid var(--primaria); }

.swipe-container { position: relative; overflow: hidden; border-radius: 12px; margin-bottom: 20px; }
.swipe-container:hover .keyboard-card { transform: translateX(-140px); }

.action-buttons { position: absolute; right: 0; top: 0; bottom: 0; width: 140px; display: flex; z-index: 1; }
.btn-action { flex: 1; border: none; color: #fff; font-size: 1.3rem; cursor: pointer; }
.btn-green-swipe { background: var(--verde); }
.btn-red-swipe { background: var(--primaria); }

.desc-center { color: rgba(255,255,255,0.6); margin: 10px 0 0; text-align: center; line-height: 1.5; }

.btn-x { background: rgba(255,255,255,0.1); border: none; color: #fff; width: 25px; height: 25px; border-radius: 50%; cursor: pointer; transition: 0.3s; }
.btn-x:hover { background: var(--primaria); }

.progress-line { position: absolute; bottom: 0; left: 0; height: 5px; background: var(--secundaria); animation: fill 1.5s linear forwards; }
@keyframes fill { from { width: 0; } to { width: 100%; } }

.bg-glow { position: fixed; top: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; }
.glow-1 { position: absolute; top: 0; left: 0; width: 600px; height: 600px; background: radial-gradient(circle, rgba(204, 0, 0, 0.15) 0%, transparent 70%); filter: blur(100px); }

.empty-text { text-align: center; color: rgba(255,255,255,0.3); margin-top: -10px; margin-bottom: 30px;}
.btn-clear-outline { background: transparent; border: 1px solid var(--primaria); color: var(--primaria); font-size: 0.7rem; padding: 5px 15px;margin-bottom: 1rem; border-radius: 4px; font-weight: 800; cursor: pointer; transition: 0.3s; }
.btn-clear-outline:hover { background: var(--primaria); color: #fff; }
</style>