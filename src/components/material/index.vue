<template>
    <div class="material">
        <PageHeader title="物料">
            <div>
                <el-button type="primary" round size="mini">添加物料</el-button>
            </div>
        </PageHeader>
        <MainWrapper>
            <card>
                <el-row>
                    <el-col>
                        客户端类型：
                        <el-radio-group v-model="filterType.agent" size="mini">
                            <el-radio-button label="pc">Pc</el-radio-button>
                            <el-radio-button label="mobile">Mobile</el-radio-button>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        框架类型：
                        <el-radio-group v-model="filterType.framework" size="mini">
                            <el-radio-button label="vue">Vue</el-radio-button>
                            <el-radio-button label="react">React</el-radio-button>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        物料类型：
                        <el-radio-group v-model="filterType.material" size="mini">
                            <el-radio-button label="block">区块</el-radio-button>
                            <el-radio-button label="component">组件</el-radio-button>
                            <el-radio-button label="template">模板</el-radio-button>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <!-- <el-row>
                    <el-col>
                        <el-button size="mini" type="primary" @click="search">刷新</el-button>
                    </el-col>
                </el-row> -->
                <template v-if="filterType.material === 'block'">
                    <item-list>
                        <block-item v-for="(item, key) in blocks" 
                            :info="item"
                            :key="key"></block-item>
                    </item-list>
                </template>
                <template v-else-if="filterType.material === 'component'">
                    <item-list>
                        <component-item v-for="(item, key) in components" 
                            :info="item"
                            :key="key"></component-item>
                    </item-list>
                </template>
                <template v-else>
                    <item-list>
                        <component-item v-for="(item, key) in cps" 
                            :info="item"
                            :key="key"></component-item>
                    </item-list>
                </template>
            </card>
        </MainWrapper>

    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import MainWrapper from '../MainWrapper';
import ItemList from './ItemList';
import BlockItem from './BlockItem';
import ComponentItem from './ComponentItem';

export default {
    name: 'Material',
    data () {
        return {
            filterType: {
                agent: 'pc',
                framework: 'vue',
                material: 'block'
            }
        };
    },
    watch: {
        filterType: {
            handler: function(val) {
                this.search(val);
            },
            deep: true
        }
    },
    computed: {
        blocks: function () {
            return this.$store.state.blockMaterials;
        },
        components: function () {
            return this.$store.state.componentMaterials;
        }
    },
    methods: {
        search (params) {
            this.$store.dispatch('getMaterials', params);
        }
    },
    components: {
        PageHeader,
        Card,
        MainWrapper,
        ItemList,
        BlockItem,
        ComponentItem
    },
    mounted () {
        this.search(this.filterType);
    }
}
</script>

<style lang="less" scoped>
.el-row {
    margin-bottom: 24px;
}
.material {
    .content {

    }
}
</style>