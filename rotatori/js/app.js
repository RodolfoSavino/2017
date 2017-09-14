const vf = new Vue({
    el: '#app',
    data: {
        personas: [],
        persona:{
            indice: '',
            nombre: '',
            apellido: '',
            telefono: '',
            direccion: '',
            mail: '',
            sexo:''
        },
        ultimoId: 1,
        alertaAgregado: false,
        alertaModificado: false,
        vista: 'agregar',
        filtro: '',
        estadoMenu: false
    },
    computed: {
        personasFiltradas() {
            return this.personas.filter(p => (p.nombre.toUpperCase().indexOf(this.filtro.toUpperCase()) >= 0) || p.apellido.toUpperCase().indexOf(this.filtro.toUpperCase()) >=0
            || p.direccion.toUpperCase().indexOf(this.filtro.toUpperCase()) >=0 || p.mail.toUpperCase().indexOf(this.filtro.toUpperCase()) >=0
            || p.telefono.indexOf(this.filtro) >=0);
        },
        cantPersonas(){
            return this.personas.length;
        },
        formOK() {
            return this.persona.nombre && this.persona.apellido && this.persona.sexo 
            && this.persona.direccion && this.persona.mail && this.persona.telefono;
        }
    },
    methods: {
        cambiarVista(vista){
            this.vista = vista;
            if(vista!="modificar")
                this.cambiarMenu();
            this.estadoAlerta = false;
            this.limpiarForm();
        },
        cambiarAlerta(tipo){
            if(tipo == 'agregado')
                this.alertaAgregado = !this.alertaAgregado
            else
                this.alertaModificado = !this.alertaModificado;
        },
        cambiarMenu(){
            this.estadoMenu = !this.estadoMenu;
        },
        limpiarForm(){
            this.persona.nombre= '';
            this.persona.apellido= '';
            this.persona.telefono= '';
            this.persona.direccion= '';
            this.persona.mail= '';
            this.persona.sexo= '';
        },
        nuevaPersona() {
            this.persona.indice = this.ultimoId;
            this.ultimoId++;
            this.personas.push(Object.assign({}, this.persona));
            personasText = JSON.stringify(this.personas);
            localStorage.setItem("contactos", personasText);
            this.limpiarForm();
            this.cambiarAlerta(); 
        },
        cargarPersona(person){
            this.persona.indice = person.indice;
            this.persona.nombre = person.nombre;
            this.persona.apellido = person.apellido;
            this.persona.direccion = person.direccion;
            this.persona.telefono = person.telefono;
            this.persona.mail = person.mail;
            this.persona.sexo = person.sexo;
        },
        pasarModificar(person){
            this.cambiarVista('modificar');
            this.cargarPersona(person);
        },
        modificarPersona(){
            pos=0;
            while(this.personas[pos].indice != this.persona.indice)
                pos++;

            this.personas[pos].nombre = this.persona.nombre;
            this.personas[pos].apellido = this.persona.apellido;
            this.personas[pos].direccion = this.persona.direccion;
            this.personas[pos].telefono = this.persona.telefono;
            this.personas[pos].mail = this.persona.mail;
            this.personas[pos].sexo = this.persona.sexo;
            this.limpiarForm();
            this.cambiarAlerta('modificado');
        },
        borrarPersona(person){
            this.cargarPersona(person);
            pos=0;
            while(this.personas[pos].indice != this.persona.indice)
                pos++;
            this.personas.splice(pos,1);
            if(this.personas.length == 0)
                localStorage.clear();
            else{
                personasText = JSON.stringify(this.personas);
                localStorage.setItem("contactos", personasText);
            }
        },
    },
    mounted(){//se ejecuta una vez al principio
        if(localStorage.length !=0 )
            this.personas = JSON.parse(localStorage.getItem("contactos"));
            this.ultimoId = this.personas[(this.personas.length-1)].indice + 1; 
    }
});