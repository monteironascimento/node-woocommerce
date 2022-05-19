import express from "express";
import { categoriasRouter, insertCategoriaRouter, updateCategoriaRouter, deletCategoriaRouter , categoriasLimparRouter, findCategoriaDescricao} from './controller/categorias.route';
import { tagsRouter } from './controller/tags.route';
import { produtosRouter , insertProdutoRouter, updateProdutoRouter, deletProdutoRouter, produtoListAllRouter, produtosLimparRouter , produtoListSkuouter} from './controller/produtos.route';
import { imagensLimparRouter } from './controller/imagens.route'


const port = (process.env.NODE_ENV === 'production' ||process.env.NODE_ENV === 'test' ? 3071 : 3070);

const app = express();

console.log(`START  NODE-CRUD-WOOCOMMERCE - AMBIENTE ${process.env.NODE_ENV}   PORTA ${port}`)

app.use(express.json({limit: '1000mb'}));
app.use(express.urlencoded({limit: '1000mb'}));

app.use(express.json());

app.use( "/categoriaBatch", categoriasRouter);
app.use( "/produtoBatch", produtosRouter);
app.use( "/tagBatch", tagsRouter);

app.use( "/categoriaDescricao", findCategoriaDescricao);
app.use( "/categoriaInsert", insertCategoriaRouter);
app.use( "/categoriaUpdate", updateCategoriaRouter);
app.use( "/categoriaDelete", deletCategoriaRouter);
app.use( "/categoriasLimpar", categoriasLimparRouter);
app.use( "/imagensLimpar", imagensLimparRouter);



app.use( "/produtos", produtoListAllRouter);
app.use( "/produtosku", produtoListSkuouter);

app.use( "/produtoInsert", insertProdutoRouter);
app.use( "/produtoUpdate", updateProdutoRouter);
app.use( "/produtoDelete", deletProdutoRouter);
app.use( "/produtosLimpar", produtosLimparRouter);


app.get('/', (require, response) => {
    console.log("SERVIDOR RODANDO NORMALMENTE ----- OK")
    return response.json({status: "OK"});
})

app.listen(port);