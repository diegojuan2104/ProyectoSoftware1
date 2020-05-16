import axios from "axios";
export default {
  beforeMount() {
    sessionStorage.setItem("token", "");
  },

  data() {
    return {
      correo: "",
      clave: ""
    };
  },
  methods: {
    async iniciarSesion() {
      try {
        let log = {
          correo: this.correo,
          clave: this.clave
        };
        let res = await axios.post("http://localhost:3001/api/v1/login", log);
        console.log(res);
        const token = res.data.info;
        const user = res.data.usuario.id;
        const userRol = res.data.usuario.rol;
        console.log(user);
        console.log(userRol);
        sessionStorage.setItem("idUser", user);
        sessionStorage.setItem("userRol", userRol);
        sessionStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = token;
        window.location.replace("http://localhost:3000/propuestas");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
