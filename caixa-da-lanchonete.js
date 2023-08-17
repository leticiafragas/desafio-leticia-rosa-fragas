class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: { descricao: 'Café', valor: 3.00 },
            chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50 },
            suco: { descricao: 'Suco Natural', valor: 6.20 },
            sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
            queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            salgado: { descricao: 'Salgado', valor: 7.25 },
            combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
        };

        this.descontosTaxas = {
            dinheiro: 0.05,
            credito: 0.03
        };

        this.mensagens = {
            itensVazios: "Não há itens no carrinho de compra!",
            itemInvalido: "Item inválido!",
            extraSemPrincipal: "Item extra não pode ser pedido sem o principal",
            formaPagamentoInvalida: "Forma de pagamento inválida!"
        };
    }

    calcularValorDosItens(itens) {
        return itens.reduce((total, item) => {
            if (!this.cardapio[item.codigo]) {
                throw new Error(this.mensagens.itemInvalido);
            }

            total += this.cardapio[item.codigo].valor * item.quantidade;
            return total;
        }, 0);
    }

    calcularValorExtra(itens) {
        return itens.reduce((total, item) => {
            if (item.extra && !this.cardapio[item.extra]) {
                throw new Error(this.mensagens.extraSemPrincipal);
            }

            if (item.extra) {
                total += this.cardapio[item.extra].valor * item.quantidade;
            }

            return total;
        }, 0);
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (itens.length === 0) {
            return this.mensagens.itensVazios;
        }

        try {
            const valorItens = this.calcularValorDosItens(itens);
            const valorExtra = this.calcularValorExtra(itens);

            let valorTotal = valorItens + valorExtra;

            if (!this.descontosTaxas[metodoDePagamento] && metodoDePagamento !== "debito") {
                return this.mensagens.formaPagamentoInvalida;
            }

            if (metodoDePagamento === "dinheiro") {
                valorTotal *= 1 - this.descontosTaxas.dinheiro;
            } else if (metodoDePagamento === "credito") {
                valorTotal *= 1 + this.descontosTaxas.credito;
            }

            return `Total a pagar: R$ ${valorTotal.toFixed(2)}`;
        } catch (error) {
            return error.message;
        }
    }
}

export { CaixaDaLanchonete };